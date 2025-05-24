from rest_framework import serializers
from .models import Wallet, Payment, Transaction
from django.contrib.auth import get_user_model

User = get_user_model()

class WalletSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)  # show username

    class Meta:
        model = Wallet
        fields = ['user', 'balance']


class PaymentSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)  # show username
    
    class Meta:
        model = Payment
        fields = ['id', 'user', 'gateway', 'amount', 'coins_purchased', 'created_at', 'successful', 'gateway_transaction_id']
        read_only_fields = ['id', 'created_at', 'successful']


class TransactionSerializer(serializers.ModelSerializer):
    sender = serializers.StringRelatedField(read_only=True)
    receiver = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Transaction
        fields = ['id', 'sender', 'receiver', 'amount', 'type', 'note', 'created_at']
        read_only_fields = ['id', 'created_at']
