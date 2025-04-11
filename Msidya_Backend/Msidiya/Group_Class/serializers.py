from rest_framework import serializers
from .models import Category, StudentAppointment, Subject, Topic, GroupClass, GroupClassReview, Report, Schedule, Discount


class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = '__all__'

class SubjectSerializer(serializers.ModelSerializer):
    topics = TopicSerializer(many=True, read_only=True)

    class Meta:
        model = Subject
        fields = '__all__'
class CategorySerializer(serializers.ModelSerializer):
    subjects = serializers.PrimaryKeyRelatedField(many=True, queryset=Subject.objects.all(), required=False)

    class Meta:
        model = Category
        fields = '__all__'
        extra_kwargs = {
            'status': {'required': False} 
        }

# Group Class Serializer
class GroupClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupClass
        fields = '__all__'

# Group Class Review Serializer
class GroupClassReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupClassReview
        fields = '__all__'


# Report Serializer
class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = '__all__'

class ScheduleSerializer(serializers.ModelSerializer):
    created_by = serializers.ReadOnlyField(source='created_by.username')
    session_link = serializers.ReadOnlyField()
    group_class = GroupClassSerializer()  # Include full group class details
    category_name = serializers.CharField(source='group_class.category.name', read_only=True)

    class Meta:
        model = Schedule
        fields = ['id', 'group_class', 'category_name', 'date', 'duration', 'session_link', 'created_by']
        read_only_fields = ['session_link']
class ScheduleCreateSerializer(serializers.ModelSerializer):
    created_by = serializers.ReadOnlyField(source='created_by.username')
    session_link = serializers.ReadOnlyField()

    class Meta:
        model = Schedule
        fields = ['id', 'group_class', 'date', 'duration', 'session_link', 'created_by']
        read_only_fields = ['session_link']

# Discount Serializer
class DiscountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Discount
        fields = '__all__'
class StudentAppointmentSerializer(serializers.ModelSerializer):
    schedule = ScheduleSerializer(read_only=True)

    class Meta:
        model = StudentAppointment
        fields = ['id', 'schedule', 'booking_date', 'status']