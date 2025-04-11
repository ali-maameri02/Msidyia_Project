from Group_Class.models import Schedule,GroupClass
from rest_framework import serializers
from .models import Currency, PaymentAccount, Payout, StudentPayment
from Account.serializers import UserSerializer
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
class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = ['id', 'date', 'duration', 'session_link']

class GroupClassSerializer(serializers.ModelSerializer):
    tutor = UserSerializer( read_only=True) 
    schedules = ScheduleSerializer(many=True, read_only=True)  # Include schedules related to the group class

    class Meta:
        model = GroupClass
        fields = ['id', 'title', 'grade', 'price', 'category', 'max_book', 'class_type', 'main_image', 'status', 'last_time', 'schedules','tutor']
class StudentPaymentSerializer(serializers.ModelSerializer):
    group_class = GroupClassSerializer(read_only=True)  # Include nested GroupClass details

    class Meta:
        model = StudentPayment
        fields = ['id', 'student', 'group_class', 'amount', 'status', 'checkout_url', 'created_on']
        read_only_fields = ['id', 'status', 'checkout_url', 'created_on']