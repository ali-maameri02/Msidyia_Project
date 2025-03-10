from rest_framework import serializers
from .models import Chat, Notification, Transaction, User, Tutor, Student, Ms_Seller


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        
        
class UserregisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username','password','Role']
class TutorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tutor
        # fields = '__all__'
        exclude = ('user',)      
class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = [ 'Grade']
class MsSellerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ms_Seller
        fields = [ 'Description', 'Intro_video', 'Verification_Id']      
class UserUpdateSerializer(serializers.ModelSerializer):
    student = StudentSerializer(required=False)
    tutor = TutorSerializer(required=False)
    ms_seller = MsSellerSerializer(required=False)

    class Meta:
        model = User
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        # Call the parent constructor
        super(UserUpdateSerializer, self).__init__(*args, **kwargs)
        
        # Get the role of the user if available
        if 'data' in kwargs:
            role = kwargs['data'].get('Role')  # During creation/updating
        else:
            role = getattr(self.instance, 'Role', None)  # During read

        # Conditionally remove fields based on user role
        if role == 'Student':
            self.fields.pop('tutor', None)
            self.fields.pop('ms_seller', None)
        elif role == 'Tutor':
            self.fields.pop('student', None)
            self.fields.pop('ms_seller', None)
        elif role == 'Ms_seller':
            self.fields.pop('student', None)
            self.fields.pop('tutor', None)
        else:
            # If the role is unknown, you can choose to hide all these fields or keep them all
            self.fields.pop('student', None)
            self.fields.pop('tutor', None)
            self.fields.pop('ms_seller', None)

    def update(self, instance, validated_data):
        # Update user fields
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.Phone_number = validated_data.get('Phone_number', instance.Phone_number)

        # Extract data for related entities
        student_data = validated_data.pop('student', None)
        tutor_data = validated_data.pop('tutor', None)
        ms_seller_data = validated_data.pop('ms_seller', None)

        # Logic to update related entities based on role
        if student_data:
            Tutor.objects.filter(user=instance).delete()
            Ms_Seller.objects.filter(user=instance).delete()
            Student.objects.update_or_create(user=instance, defaults=student_data)
        elif tutor_data:
            Student.objects.filter(user=instance).delete()
            Ms_Seller.objects.filter(user=instance).delete()
            Tutor.objects.update_or_create(user=instance, defaults=tutor_data)
        elif ms_seller_data:
            Student.objects.filter(user=instance).delete()
            Tutor.objects.filter(user=instance).delete()
            Ms_Seller.objects.update_or_create(user=instance, defaults=ms_seller_data)

        # Save the updated user instance
        instance.save()
        return instance

    def to_representation(self, instance):
        # Get the standard representation
        representation = super().to_representation(instance)

        # Exclude 'student' and 'ms_seller' when the user is a tutor
        if instance.Role == 'Tutor':
            representation.pop('student', None)
            representation.pop('ms_seller', None)

        # Exclude 'tutor' and 'ms_seller' when the user is a student
        elif instance.Role == 'Student':
            representation.pop('tutor', None)
            representation.pop('ms_seller', None)

        # Exclude 'student' and 'tutor' when the user is a seller
        elif instance.Role == 'Seller':
            representation.pop('student', None)
            representation.pop('tutor', None)

        return representation

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