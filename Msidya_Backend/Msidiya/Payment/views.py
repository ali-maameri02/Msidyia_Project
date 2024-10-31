from rest_framework import generics
from .models import Currency, PaymentAccount, Payout
from .serializers import CurrencySerializer, PaymentAccountSerializer, PayoutSerializer

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
