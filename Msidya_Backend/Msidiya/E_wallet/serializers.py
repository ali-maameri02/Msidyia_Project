from rest_framework import serializers

from Group_Class.models import GroupClass


from .models import Wallet, Payment, Transaction
from django.contrib.auth import get_user_model

from rest_framework import serializers
from django.conf import settings
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



class GroupClassTransactionSerializer(serializers.ModelSerializer):
    user_name = serializers.SerializerMethodField()
    course_name = serializers.SerializerMethodField()
    price = serializers.DecimalField(max_digits=10, decimal_places=2, source='amount')
    earnings = serializers.SerializerMethodField()
    created_on = serializers.DateTimeField(source='created_at', format='%b %d, %Y')
    
    class Meta:
        model = Transaction
        fields = [
            'id',
            'user_name',
            'course_name', 
            'price',
            'earnings',
            'created_on',
            'note'
        ]
    
    def get_user_name(self, obj):
        """Return the student's name who enrolled in the class"""
        if obj.sender:
            return obj.sender.username
        return "Unknown Student"
    
    def get_course_name(self, obj):
        """Extract course name from the transaction note"""
        if obj.note and "Enrollment in class" in obj.note:
            try:
                start = obj.note.find("'") + 1
                end = obj.note.find("'", start)
                if start > 0 and end > start:
                    return obj.note[start:end]
            except:
                pass
        return "Unknown Course"
    
    def get_earnings(self, obj):
        """Calculate earnings (assuming some commission or fee structure)"""
        # You can modify this logic based on your business rules
        # For now, I'm assuming earnings = 90% of the price (10% platform fee)
        earnings_percentage = 0.9
        return round(obj.amount * earnings_percentage, 2)


class EnrollClassItemSerializer(serializers.Serializer):
    class_id = serializers.IntegerField(min_value=1)

    def validate_class_id(self, value):
        try:
            group_class = GroupClass.objects.get(pk=value)
            # if group_class.class_type == 'Free':
            #     raise serializers.ValidationError(f"Class '{group_class.title}' is free and cannot be processed via wallet enrollment.")
            if group_class.status != 'Visible': # Or any other status that makes it unavailable
                raise serializers.ValidationError(f"Class '{group_class.title}' is currently not available for enrollment.")
            
            # Optional: Check for class capacity (max_book)
            # This would require an Enrollment model to count current bookings.
            # from enrollments.models import Enrollment # Assuming an Enrollment model
            # current_bookings = Enrollment.objects.filter(group_class=group_class, status='active').count() # Example
            # if current_bookings >= group_class.max_book:
            #     raise serializers.ValidationError(f"Class '{group_class.title}' is full.")

        except GroupClass.DoesNotExist:
            raise serializers.ValidationError(f"Class with ID {value} does not exist.")
        return value # Return the id itself


class EnrollClassListSerializer(serializers.Serializer):
    items = EnrollClassItemSerializer(many=True)

    def validate_items(self, value):
        if not value:
            raise serializers.ValidationError("No items provided for enrollment.")
        
        class_ids = [item['class_id'] for item in value]
        if len(class_ids) != len(set(class_ids)):
            raise serializers.ValidationError("Duplicate class IDs found in the enrollment request.")
        return value


