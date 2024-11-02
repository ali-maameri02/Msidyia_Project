from rest_framework import serializers
from .models import Currency, PaymentAccount, Payout, StudentPayment

class CurrencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Currency
        fields = '__all__'

class PaymentAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentAccount
        fields = '__all__'

class PayoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payout
        fields = '__all__'

class StudentPaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentPayment
        fields = ['id', 'student', 'group_class', 'amount', 'status', 'checkout_url', 'created_on']
        read_only_fields = ['id', 'status', 'checkout_url', 'created_on']