from rest_framework import viewsets, permissions
from django.db.models import Q
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


import hashlib
import hmac
from django.views.decorators.http import require_POST

# Your Chargily Pay Secret key, will be used to calculate the Signature
api_secret_key = 'test_sk_oqQbwAEfHjhC5p36EJPQnUAO7KEA8ydDs3pUZiTS'


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
        "success_url": "http://127.0.0.1:8000/api/e_wallet/webhook",


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
            coins_purchased=amount * 0.1, 
            gateway=payment_method,
            gateway_transaction_id=checkout['id']
        )
        print("✅ Payment saved!")
        with db_transaction.atomic():
        # 1) Credit the user’s wallet
            wallet = Wallet.objects.select_for_update().get(user_id=user_id)
            wallet.balance +=Decimal( amount * 0.1)
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
    print(request.data)
    student = request.user
    class_fee = request.data['class_fee']  
    tutor_id = request.data['tutor_id']  
    tutor = get_object_or_404(User, pk=tutor_id)
    with db_transaction.atomic():
        # 1) Withdraw from student
        s_wallet = Wallet.objects.select_for_update().get(user=student )
        print("hiiiiiiiiiii")
        if s_wallet.balance < class_fee:
            return JsonResponse({"error":"Insufficient coins"}, 400)
        s_wallet.balance -= class_fee

        s_wallet.save()
        print("PRRRRRRRRRRRRRRRRRRRRRRRRRR")
        # 2) Deposit to tutor
        t_wallet = Wallet.objects.select_for_update().get(user=tutor )
        t_wallet.balance += class_fee
        t_wallet.save()

        # 3) Log it 
        Transaction.objects.create(
            sender=student,
            receiver=tutor,
            amount=class_fee,
            type='enroll',
            note=f"Enrollment in class {request.data['tutor_id']}"
        )

    # then your existing class‐registration logic…
    return JsonResponse({"message":"Enrolled!"})


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
    print("HIIIIIII")
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
