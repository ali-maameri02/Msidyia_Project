from rest_framework import generics, permissions
from .models import Category, Subject, Topic, GroupClass, GroupClassReview, Report, Schedule, Discount
from .serializers import (
    CategorySerializer, SubjectSerializer, TopicSerializer,
    GroupClassSerializer, GroupClassReviewSerializer, ReportSerializer,
    ScheduleSerializer, DiscountSerializer
)
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import viewsets
from rest_framework import status













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
    serializer_class = GroupClassReviewSerializer
    permission_classes = [permissions.AllowAny]


class GroupClassReviewDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = GroupClassReview.objects.all()
    serializer_class = GroupClassReviewSerializer
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
