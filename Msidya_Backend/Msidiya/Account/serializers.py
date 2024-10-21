from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'Role', 'password')

class TutoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tutor
        fields = '__all__'
class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'
class Ms_SellerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ms_Seller
        fields = '__all__'
class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'
class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'
class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = '__all__'
class Ms_WalletSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ms_Seller
        fields = '__all__'
