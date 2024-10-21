from rest_framework import serializers
from .models import Chat, Notification, Transaction, User, Tutor, Student, Ms_Seller

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'Role', 'password')

class UpdateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'  # Fields are already correctly defined here

class TutorSerializer(serializers.ModelSerializer):
    user = UpdateUserSerializer()

    class Meta:
        model = Tutor
        fields = '__all__'

    def update(self, instance, validated_data):
        # Update the nested user data
        user_data = validated_data.pop('user', None)
        if user_data:
            user_serializer = UpdateUserSerializer(instance=instance.user, data=user_data, partial=True)
            user_serializer.is_valid(raise_exception=True)
            user_serializer.save()

        # Update the remaining Tutor fields
        return super().update(instance, validated_data)

class StudentSerializer(serializers.ModelSerializer):
    user = UpdateUserSerializer()

    class Meta:
        model = Student
        fields = '__all__'

    def update(self, instance, validated_data):
        # Update the nested user data
        user_data = validated_data.pop('user', None)
        if user_data:
            user_serializer = UpdateUserSerializer(instance=instance.user, data=user_data, partial=True)
            user_serializer.is_valid(raise_exception=True)
            user_serializer.save()

        # Update the remaining Student fields
        return super().update(instance, validated_data)

class Ms_SellerSerializer(serializers.ModelSerializer):
    user = UpdateUserSerializer()

    class Meta:
        model = Ms_Seller
        fields = '__all__'

    def update(self, instance, validated_data):
        # Update the nested user data
        user_data = validated_data.pop('user', None)
        if user_data:
            user_serializer = UpdateUserSerializer(instance=instance.user, data=user_data, partial=True)
            user_serializer.is_valid(raise_exception=True)
            user_serializer.save()

        # Update the remaining Ms_Seller fields
        return super().update(instance, validated_data)

        
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
