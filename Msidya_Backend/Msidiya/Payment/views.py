from rest_framework import generics
from .models import Currency, PaymentAccount, Payout
from .serializers import CurrencySerializer, PaymentAccountSerializer, PayoutSerializer
from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import  StudentPayment
from Group_Class.models import  GroupClass
from .serializers import StudentPaymentSerializer
from django.views.decorators.csrf import csrf_exempt



# class AmountCheckoutViewSet(viewsets.ModelViewSet):
#     queryset = AmountCheckout.objects.all()
#     serializer_class = AmountCheckoutSerializer
# Currency Views
class CurrencyListCreateView(generics.ListCreateAPIView):
    queryset = Currency.objects.all()
    serializer_class = CurrencySerializer

class CurrencyRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Currency.objects.all()
    serializer_class = CurrencySerializer

# PaymentAccount Views
class PaymentAccountListCreateView(generics.ListCreateAPIView):
    queryset = PaymentAccount.objects.all()
    serializer_class = PaymentAccountSerializer

class PaymentAccountRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = PaymentAccount.objects.all()
    serializer_class = PaymentAccountSerializer

# Payout Views
class PayoutListCreateView(generics.ListCreateAPIView):
    queryset = Payout.objects.all()
    serializer_class = PayoutSerializer

class PayoutRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Payout.objects.all()
    serializer_class = PayoutSerializer


# class WebhookView(View):
#     def post(self, request):
#         signature = request.headers.get("signature")
#         payload = request.body.decode("utf-8")

#         if not signature:
#             return HttpResponse(status=400)

#         if not client.validate_signature(signature, payload):
#             return HttpResponse(status=403)

#         event = json.loads(payload)
#         checkout_id = event["data"]["id"]
#         checkout = AmountCheckout.objects.get(entity_id=checkout_id)

#         # Update checkout status based on the event
#         if event["type"] == "checkout.paid":
#             checkout.on_paid()
#         elif event["type"] == "checkout.failed":
#             checkout.on_failure()
#         elif event["type"] == "checkout.canceled":
#             checkout.on_cancel()
#         elif event["type"] == "checkout.expired":
#             checkout.on_expire()
#         else:
#             return HttpResponse(status=400)

#         return JsonResponse({}, status=200)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
@csrf_exempt

class InitiatePaymentView(APIView):
    def post(self, request, class_id):
        group_class = get_object_or_404(GroupClass, id=class_id)
        
        # Ensure the class is paid, not free
        if group_class.class_type == 'Free':
            return Response({"error": "This class is free; no payment is required."}, status=status.HTTP_400_BAD_REQUEST)
        
        student = request.user  # Assume authenticated user
        payment = StudentPayment.objects.create(
            student=student,
            group_class=group_class,
            amount=group_class.price,
        )
        
        # Define URLs for success and failure redirection
        success_url = "https://example.com/success"
        failure_url = "https://example.com/failure"
        
        # Attempt to create a checkout link with Chargily
        try:
            checkout_response = payment.create_chargily_checkout(success_url, failure_url)
            serializer = StudentPaymentSerializer(payment)
            return Response({"checkout_url": payment.checkout_url, "payment": serializer.data}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        
        
class StudentPaymentView(generics.ListAPIView):
    serializer_class = StudentPaymentSerializer

    def get_queryset(self):
        # Get the student_id from the URL parameters
        student_id = self.kwargs.get('student_id')
        # Filter payments for the given student_id
        return StudentPayment.objects.filter(student_id=student_id)