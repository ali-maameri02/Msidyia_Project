from rest_framework import serializers

from Account.serializers import UserSerializer
from .models import Category, StudentAppointment, Subject, Topic, GroupClass, GroupClassReview, Report, Schedule, Discount
from Account.models import *

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
class GroupClassReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)  # Or whatever your UserSerializer is called

    class Meta:
        model = GroupClassReview
        fields = ['id', 'user', 'group_class', 'rating', 'comment']
class GroupClassReviewSerializercreate(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        required=False
    )

    class Meta:
        model = GroupClassReview
        fields = ['id', 'user', 'group_class', 'rating', 'comment']

    def create(self, validated_data):
        # Automatically set user if not provided
        user = self.context['request'].user
        validated_data.setdefault('user', user)
        return super().create(validated_data)

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
    topic = TopicSerializer(many=False)
    class Meta:
        model = Schedule
        fields = ['id', 'group_class', 'category_name', 'date', 'duration', 'session_link', 'created_by','topic']
        read_only_fields = ['session_link']
class ScheduleCreateSerializer(serializers.ModelSerializer):
    created_by = serializers.ReadOnlyField(source='created_by.username')
    session_link = serializers.ReadOnlyField()
    topic = TopicSerializer()

    class Meta:
        model = Schedule
        fields = ['id', 'group_class', 'date', 'duration', 'session_link', 'created_by', 'topic']
        read_only_fields = ['session_link']

    def create(self, validated_data):
        topic_data = validated_data.pop('topic')
        topic, _ = Topic.objects.get_or_create(**topic_data)

        schedule = Schedule.objects.create(topic=topic, **validated_data)
        return schedule
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