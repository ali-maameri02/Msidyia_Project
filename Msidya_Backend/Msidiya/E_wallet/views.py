from asyncio import wait
from rest_framework import viewsets, permissions
from django.db.models import Q
from decimal import Decimal 
from Group_Class.models import GroupClass
from .models import Wallet, Payment, Transaction
from .serializers import WalletSerializer, PaymentSerializer, TransactionSerializer
from rest_framework.decorators import api_view, permission_classes
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponse
from rest_framework.permissions import IsAuthenticated
from django.db import transaction as db_transaction
from decimal import Decimal
from django.shortcuts import get_object_or_404
import requests
import json
from Account.models import User
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.db import transaction as db_transaction
from django.utils import timezone # For potential enrollment date logging

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .models import Wallet, Transaction
from .serializers import EnrollClassListSerializer,GroupClassTransactionSerializer

User = get_user_model()


import hashlib
import hmac
from django.views.decorators.http import require_POST

# Your Chargily Pay Secret key, will be used to calculate the Signature
api_secret_key = 'test_sk_qSQ8o3Aa1HRlU5pWrO6lOUT1RnoqG7JyQ629mRRV'



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def initiate_payment(request):
    print("🔔 Payment initiation triggered")
    user = request.user
    amount = request.data.get('amount')    
    print("🔔 Payment initiation triggered")
    payload = {
        "amount": amount,
        "currency": "dzd",
        "description": str(user.id),  # So you get it back in webhook
        "success_url": "https://msidiya.com",


    }
    print("Payload: ", payload)
    headers = {
        "Authorization": f"Bearer {api_secret_key}",
        "Content-Type": "application/json"
    }
    print("Headers: ", headers)
    response = requests.post(
        "https://pay.chargily.net/test/api/v2/checkouts",
        json=payload,
        headers=headers
    )
    print("Response: ", response.json())
    if response.status_code == 200:
        data = response.json()
        print("checkout_url: ", data["checkout_url"])
        return JsonResponse({"checkout_url": data["checkout_url"]})
    else:
        return JsonResponse({"error": "Failed to initiate payment"}, status=400)


@csrf_exempt
@require_POST
def Chargily_webhook(request):
    print("🔔 Webhook triggered")
    print("Chargily Webhook Endpoint Hit")
    signature = request.headers.get('signature')

    # Getting the raw payload from the request body
    payload = request.body.decode('utf-8')

    # # If there is no signature, ignore the request
    # if not signature:
    #     return HttpResponse(status=400)

    # # Calculate the signature
    # computed_signature = hmac.new(api_secret_key.encode('utf-8'), payload.encode('utf-8'), hashlib.sha256).hexdigest()

    # # If the calculated signature doesn't match the received signature, ignore the request
    # if not hmac.compare_digest(signature, computed_signature):
    #     return HttpResponse(status=403)

    # If the signatures match, proceed to decode the JSON payload
    event = json.loads(payload)
    print(event)
    # Switch based on the event type
    if event['type'] == 'checkout.paid':
        checkout = event['data']
        user_id = int(checkout['description'])  
        amount = checkout['amount']
        payment_method = checkout['payment_method']
        payment = Payment.objects.create(
            user_id=user_id,
            amount=amount,
            successful=True,
            coins_purchased=amount , 
            gateway=payment_method,
            gateway_transaction_id=checkout['id']
        )
        print("✅ Payment saved!")
        with db_transaction.atomic():
        # 1) Credit the user’s wallet
            wallet, created = Wallet.objects.select_for_update().get_or_create(
                user_id=user_id,
            )
            wallet.balance +=Decimal( amount  )
            wallet.save()

            # 2) Log the “purchase” transaction
            Transaction.objects.create(
                sender=None,                # system → user
                receiver_id=user_id,
                amount=payment.coins_purchased,
                type='receive',            
                note=f"Purchased via {payment.gateway}"
            )

    elif event['type'] == 'checkout.failed':
        checkout = event['data']
        print("❌ Payment failed!")

    # Respond with a 200 OK status code to let us know that you've received the webhook
    return JsonResponse({}, status=200)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def enroll_class(request):
    student = request.user
    serializer = EnrollClassListSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    validated_items_data = serializer.validated_data['items']
     
    classes_to_process = []
    total_fee_due = Decimal('0.00') # <--- CHANGED: Initialize as Decimal
     
    for item_data in validated_items_data:
        class_id = item_data['class_id']
        try:
            group_class = GroupClass.objects.get(pk=class_id) 
            
            # Serializer should have already validated type and status.
            # You can keep the commented checks as an additional safeguard if desired.

            classes_to_process.append({
                'class_instance': group_class,
                'fee': group_class.price, # This is already a Decimal
                'tutor': group_class.tutor
            })
            total_fee_due += group_class.price # Decimal + Decimal is fine
        except GroupClass.DoesNotExist:
            return Response({"error": f"Class with ID {class_id} not found during processing."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        with db_transaction.atomic():
            student_wallet = Wallet.objects.select_for_update().get(user=student)

            # student_wallet.balance is Decimal, total_fee_due is Decimal
            if student_wallet.balance < total_fee_due:
                return Response({
                    "error": "Insufficient coins to enroll in all selected classes.",
                    "detail": f"Required: {total_fee_due:.2f}, Available: {student_wallet.balance:.2f}. Please top up your wallet."
                }, status=status.HTTP_400_BAD_REQUEST)

            student_wallet.balance -= total_fee_due # Decimal - Decimal is fine
            student_wallet.save()

            successful_enrollments_info = []
            for class_data in classes_to_process:
                group_class = class_data['class_instance']
                class_fee = class_data['fee'] # This is Decimal
                tutor = class_data['tutor']
                 
                tutor_wallet, _ = Wallet.objects.select_for_update().get_or_create(
                    user=tutor, 
                    defaults={'balance': Decimal('0.00')} # <--- CHANGED: Use Decimal for default
                )
                # tutor_wallet.balance is now guaranteed to be Decimal
                tutor_wallet.balance += class_fee # Decimal + Decimal is fine
                tutor_wallet.save()

                Transaction.objects.create(
                    sender=student,
                    receiver=tutor,
                    amount=class_fee, # Pass the Decimal value
                    type='enroll',
                    note=f"Enrollment in class '{group_class.title}' (ID: {group_class.id}) by {student.username} for {tutor.username}."
                )
                 
                # --- Actual Class Enrollment Logic ---
                # (Your existing placeholder)
                # -------------------------------------
                 
                successful_enrollments_info.append({
                    "class_id": group_class.id,
                    "title": group_class.title,
                    "fee_paid": class_fee # This will be a Decimal
                })
                 
        return Response({
            "message": f"Successfully enrolled in {len(successful_enrollments_info)} class(es).",
            "enrollments": successful_enrollments_info
        }, status=status.HTTP_200_OK)

    except Wallet.DoesNotExist:
        return Response({"error": "Student wallet not found. Please contact support."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    except Exception as e:
        print(f"Error during enrollment transaction: {str(e)}") 
        return Response({"error": "An unexpected error occurred during the enrollment process. The transaction has been rolled back."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def transfer_coins(request):
    seller = request.user
    if seller.role != 'Ms_seller':
        return JsonResponse({"error":"Not allowed"}, 403)

    amount = request.data['amount']
    receiver_id = request.data['receiver_id']
    receiver = get_object_or_404(User, pk=receiver_id)
    with db_transaction.atomic():
        sw = Wallet.objects.select_for_update().get(user=seller)
        if sw.balance < amount:
            return JsonResponse({"error":"Insufficient funds"}, 400)
        sw.balance -= amount
        sw.save()

        rw = Wallet.objects.select_for_update().get(user_id=receiver)
        rw.balance += amount; rw.save()

        Transaction.objects.create(
            sender=seller,
            receiver_id=receiver_id,
            amount=amount,
            type='send',
            note='Ms_seller transfer'
        )
    return JsonResponse({"message":"Transfer successful"})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def request_refund(request):
    user = get_object_or_404(User, pk=4)
    amount = request.data['amount']

    with db_transaction.atomic():
        w = Wallet.objects.select_for_update().get(user=user)
        if w.balance < amount:
            return JsonResponse({"error":"Insufficient balance"}, 400)
        w.balance -= amount
        w.save()

        Transaction.objects.create(
            sender=user,
            receiver=None,      # user → system
            amount=amount,
            type='refund',
            note='User requested refund'
        )
    # trigger your payout logic here (e.g., call PayPal API)
    return JsonResponse({"message":"Refund initiated"})

class WalletViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Admins see all wallets; users see their own.
    """

    serializer_class = WalletSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.is_staff or user.is_superuser:
            return Wallet.objects.all()
        return Wallet.objects.filter(user=user)


class PaymentViewSet(viewsets.ModelViewSet):
    """
    Admins see all payments; users see their own.
    """
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff or user.is_superuser:
            return Payment.objects.all().order_by('-created_at')
        return Payment.objects.filter(user=user).order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user, successful=False)


class TransactionViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Admins see all transactions; users see their own (as sender or receiver).
    """
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff or user.is_superuser:
            return Transaction.objects.all().order_by('-created_at')
        return Transaction.objects.filter(
            Q(sender=user) | Q(receiver=user)
        ).order_by('-created_at')


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def group_class_transactions(request):
    """
    Returns transactions related to group class enrollments for the authenticated teacher.
    Only shows 'enroll' type transactions where the teacher is the receiver.
    """
    teacher = request.user
    
    search_query = request.GET.get('search', '').strip()
    
    queryset = Transaction.objects.filter(
        receiver=teacher,
        type='enroll'
    ).order_by('-created_at')
    
    if search_query:
        queryset = queryset.filter(
            Q(sender__username__icontains=search_query) |
            Q(note__icontains=search_query)
        )
    
    serializer = GroupClassTransactionSerializer(queryset, many=True)
    
    return Response({
        'success': True,
        'data': serializer.data,
        'total_count': queryset.count()
    }, status=status.HTTP_200_OK)


# Returns statistics for the teacher's group class transactions.
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def group_class_transactions_stats(request):
    teacher = request.user
    
    # Get all enrollment transactions for this teacher
    transactions = Transaction.objects.filter(
        receiver=teacher,
        type='enroll'
    )
    
    # Calculate statistics
    total_transactions = transactions.count()
    total_revenue = sum(transaction.amount for transaction in transactions)
    total_earnings = total_revenue * 0.9  # Assuming 10% platform fee
    
    # Get monthly breakdown (you can expand this as needed)
    from django.db.models import Count, Sum
    from django.utils import timezone
    from datetime import datetime, timedelta
    
    # Last 6 months data
    six_months_ago = timezone.now() - timedelta(days=180)
    monthly_stats = transactions.filter(
        created_at__gte=six_months_ago
    ).extra(
        select={'month': "DATE_FORMAT(created_at, '%%Y-%%m')"}
    ).values('month').annotate(
        count=Count('id'),
        revenue=Sum('amount')
    ).order_by('month')
    
    return Response({
        'success': True,
        'stats': {
            'total_transactions': total_transactions,
            'total_revenue': float(total_revenue),
            'total_earnings': float(total_earnings),
            'monthly_breakdown': list(monthly_stats)
            }},status=status.HTTP_200_OK)
