from django.db.models.functions import TruncMonth
from django.db.models import Sum
from E_wallet.models import Transaction
from calendar import month_abbr



from django.utils import timezone
from rest_framework import generics, permissions
from .models import Category, StudentAppointment, Subject, Topic, GroupClass, GroupClassReview, Report, Schedule, Discount
from .serializers import (
    CategorySerializer, GroupClassReviewSerializer, GroupClassReviewSerializercreate, ScheduleCreateSerializer, StudentAppointmentSerializer, SubjectSerializer, TopicSerializer,
    GroupClassSerializer, ReportSerializer,
    ScheduleSerializer, DiscountSerializer
)
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import viewsets
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes













class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]  # Change this as needed
@api_view(['GET'])
def get_category_subjects(request, category_id):
    try:
        category = Category.objects.get(id=category_id)  # Get the category
        subjects = category.subjects.all()  # Get related subjects
        serializer = SubjectSerializer(subjects, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Category.DoesNotExist:
        return Response({"error": "Category not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def get_subject_topics(request, subject_id):
    try:
        subject = Subject.objects.get(id=subject_id)
        topics = Topic.objects.filter(subject=subject)  # ✅ Ensure topics are correctly linked
        serializer = TopicSerializer(topics, many=True)
        return Response(serializer.data)
    except Subject.DoesNotExist:
        return Response({"error": "Subject not found"}, status=404)

class CategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]  # Change this as needed
class SubjectListCreateView(generics.ListCreateAPIView):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    permission_classes = [permissions.AllowAny]


class SubjectDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    permission_classes = [permissions.AllowAny]
class TopicListCreateView(generics.ListCreateAPIView):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
    permission_classes = [permissions.AllowAny]


class TopicDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
    permission_classes = [permissions.AllowAny]
class GroupClassListCreateView(generics.ListCreateAPIView):
    queryset = GroupClass.objects.all()
    serializer_class = GroupClassSerializer
    permission_classes = [permissions.AllowAny]


class GroupClassDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = GroupClass.objects.all()
    serializer_class = GroupClassSerializer
    permission_classes = [permissions.AllowAny]
class GroupClassReviewListCreateView(generics.ListCreateAPIView):
    queryset = GroupClassReview.objects.all()
    permission_classes = [permissions.AllowAny]

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return GroupClassReviewSerializercreate
        return GroupClassReviewSerializer

    def get_serializer_context(self):
        return {'request': self.request}

class GroupClassReviewDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = GroupClassReview.objects.all()
    serializer_class = GroupClassReviewSerializercreate
    permission_classes = [permissions.AllowAny]
class ReportListCreateView(generics.ListCreateAPIView):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer
    permission_classes = [permissions.AllowAny]


class ReportDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer
    permission_classes = [permissions.AllowAny]
# Schedule Views
class ScheduleListCreateView(generics.ListCreateAPIView):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleCreateSerializer

    def perform_create(self, serializer):
        # Calls the `save()` method on the instance, which will trigger Lessonspace room creation
        serializer.save()
class ScheduleListView(generics.ListAPIView):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer

    def perform_create(self, serializer):
        # Calls the `save()` method on the instance, which will trigger Lessonspace room creation
        serializer.save()

class ScheduleDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer
    
class DiscountListCreateView(generics.ListCreateAPIView):
    queryset = Discount.objects.all()
    serializer_class = DiscountSerializer
    permission_classes = [permissions.AllowAny]


class DiscountDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Discount.objects.all()
    serializer_class = DiscountSerializer
    permission_classes = [permissions.AllowAny]



from rest_framework.parsers import JSONParser
class CreateSubjectForCategoryView(generics.CreateAPIView):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer

    def create(self, request, *args, **kwargs):
        category_id = kwargs.get("category_id")  # Get category ID from the URL

        try:
            category = Category.objects.get(id=category_id)  # Validate category
        except Category.DoesNotExist:
            return Response(
                {"error": "Category not found"}, 
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            subject = serializer.save()  # Create new subject
            category.subjects.add(subject)  # Add subject to the category
            return Response(
                {"message": "Subject created and added to category successfully", "subject": serializer.data}, 
                status=status.HTTP_201_CREATED
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class AddTopicToSubjectView(generics.CreateAPIView):
    serializer_class = TopicSerializer

    def create(self, request, *args, **kwargs):
        subject_id = kwargs.get("subject_id")  # Get subject ID from URL

        try:
            subject = Subject.objects.get(id=subject_id)  # Validate subject
        except Subject.DoesNotExist:
            return Response(
                {"error": "Subject not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            topic_name = serializer.validated_data["name"]  # Extract topic name
            
            # Create a new topic and add it to the subject
            topic, created = Topic.objects.get_or_create(name=topic_name)
            subject.topics.add(topic)  # ✅ Use `add()` instead of `append()`
            subject.save()

            # Return updated topics list
            topics_data = TopicSerializer(subject.topics.all(), many=True).data
            return Response(
                {"message": "Topic added to subject successfully", "topics": topics_data},
                status=status.HTTP_201_CREATED
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


from rest_framework.permissions import IsAuthenticated

class StudentAppointmentListView(generics.ListAPIView):
    serializer_class = StudentAppointmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Filter appointments for the logged-in student
        return StudentAppointment.objects.filter(student=self.request.user)
    
class BookScheduleView(generics.CreateAPIView):
    serializer_class = StudentAppointmentSerializer
    # permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        schedule_id = self.request.data.get('schedule_id')
        schedule = Schedule.objects.get(id=schedule_id)
        serializer.save(student=self.request.user, schedule=schedule)
        



class AvailableSchedulesView(generics.ListAPIView):
    serializer_class = ScheduleSerializer
    # permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Filter schedules for group classes that are visible and upcoming
        return Schedule.objects.filter(
            group_class__status='Visible',
            
        ).order_by('date')



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def group_class_completion_chart(request):
    tutor = request.user
    if tutor.Role != 'Tutor':
        return Response({"detail": "Only tutors can access this data."}, status=403)

    now = timezone.now()

    # Get all the tutor's group classes
    group_classes = GroupClass.objects.filter(tutor=tutor)

    # Count completed and not completed
    completed_count = group_classes.filter(last_time__lt=now).count()
    not_completed_count = group_classes.filter(last_time__gte=now).count()

    data = {
        "completed": completed_count,
        "not_completed": not_completed_count
    }

    return Response(data)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_monthly_sales(request):
    # Only include 'enroll' transactions where the logged-in user is the receiver
    queryset = Transaction.objects.filter(
        type='enroll',
        receiver=request.user
    )

    # Annotate by month and sum amounts
    monthly_qs = (
        queryset
        .annotate(month=TruncMonth('created_at'))
        .values('month')
        .annotate(total_sales=Sum('amount'))
        .order_by('month')
    )

    # Initialize all 12 months to zero
    month_sales = {month_abbr[i]: 0 for i in range(1, 13)}

    # Fill in actual totals
    for entry in monthly_qs:
        mon = entry['month'].strftime('%b')  # 'Jan', 'Feb', ...
        month_sales[mon] = float(entry['total_sales'] or 0)

    return Response(month_sales)
