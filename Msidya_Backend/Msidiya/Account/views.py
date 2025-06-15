from datetime import timedelta
from decimal import Decimal
from django.utils import timezone
import json
from Group_Class.models import GroupClass, StudentAppointment

from Group_Class.serializers import GroupClassSerializer
from django.db.models import F, Q, OuterRef, Subquery,Exists,Sum
import requests
from rest_framework.response import Response
from rest_framework import generics
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.views import APIView
from .models import User
from .serializers import * 
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
# what amir added 
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from E_wallet.models  import Transaction

class RegisterUserView(generics.CreateAPIView):
    serializer_class = UserregisterSerializer
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            print(user)
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key, 'message': 'Registration successful'}, status=status.HTTP_201_CREATED)
        else:
            # print("Invalid data received:")
            # print(request.data)
            # print("Serializer errors:")
            # print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class CurrentUserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
            
@api_view(['POST'])
def user_login(request):
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')

        print(f"Attempting login with username/email: {username} and password: {password}")

        user = None

        if '@' in username:
            try:
                user = User.objects.get(email=username)
                print(f"User found by email: {user}")
            except ObjectDoesNotExist:
                print(f"No user found with email: {username}")

        if not user:
            user = authenticate(username=username, password=password)
            if user:
                print(f"User authenticated with username: {user}")
            else:
                print("Authentication failed for username/email.")

        if user:
            token, _ = Token.objects.get_or_create(user=user)
            serializer = UserSerializer(user)

            # Check if the user is a Tutor
            tutor_data = None
            try:
                tutor = Tutor.objects.get(user=user)
                tutor_data = TutorSerializer(tutor).data  # Serialize Tutor data
            except Tutor.DoesNotExist:
                print("User is not a tutor.")

            return Response({
                'id': user.id,
                'token': token.key,
                'message': 'successful login',
                'profile_picture': serializer.data.get('Picture', None),
                'username': serializer.data.get('username', None),
                'user_role': serializer.data.get('Role', None),
                'is_tutor': tutor_data is not None,  # Boolean flag to indicate tutor status
                'tutor_details': tutor_data  # Return tutor details if they exist
            }, status=status.HTTP_200_OK)

        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class Users(generics.ListAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.all()  # Add parentheses here 

class QualificationListcreatview(generics.ListCreateAPIView):
    serializer_class=QualificationSerializer
    queryset = Qualification.objects.all()    

class Userretreive(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'pk'

class UserUpdateView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserUpdateSerializer
    lookup_field = 'pk'

    def patch(self, request, *args, **kwargs):
        data = request.data.copy()
        student_str = data.get('student')
        if student_str:
            try:
                data['student'] = json.loads(student_str)
            except json.JSONDecodeError:
                data['student'] = {}
        serializer = UserUpdateSerializer(instance=self.get_object(), data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data) 

class UserDelete(generics.RetrieveDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'pk'
    
    
class NotificationListView(generics.ListAPIView):
    serializer_class = NotificationSerializer

    def get_queryset(self):
        user = self.request.user  # Assuming you have user authentication
        return Notification.objects.filter(User=user)  

class NotificationUpdateView(generics.UpdateAPIView):
    serializer_class = NotificationSerializer
    queryset = Notification.objects.all()

    def get_object(self):
        return self.get_queryset().filter(User=self.request.user).first()      

class SentMessageView(generics.ListCreateAPIView):
    serializer_class = ChatSerializer
    permission_classes = [IsAuthenticated]

    def get_user(self):
        return self.request.user

    def get_queryset(self):

        user = self.get_user()
        return Chat.objects.filter(Receiver=user.id) if user else Chat.objects.none()
    
    def perform_create(self, serializer):
        chat_instance = serializer.save()

        Notification.objects.create(
            User=chat_instance.Receiver,
            Message=f"New message from {chat_instance.Sender.username}: {chat_instance.Content}",
            Status=False
        )

        return Response(
            {"detail": "Message sent and notification created."},
            status=status.HTTP_201_CREATED
        )
# this view will return the latest chat from unique users and 
# will create a chat between the current logged in user and a sender 
class UserChatHistoryView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    # Default serializer_class, will be overridden by get_serializer_class

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return ChatSerializer
        return UserwithLatestChatSerializer

    def get_queryset(self):
        current_user = self.request.user
        query = self.request.query_params.get('q', None)

        # Subquery to get the latest chat information for a given user (OuterRef('pk'))
        # with the current_user
        latest_chat_subquery = Chat.objects.filter(
            (Q(Sender=OuterRef('pk'), Receiver=current_user) | 
             Q(Sender=current_user, Receiver=OuterRef('pk')))
        ).order_by('-Time')

        if query:
            # Search mode: Find users matching the query
            users_queryset = User.objects.filter(
                Q(username__icontains=query) | Q(first_name__icontains=query) | Q(last_name__icontains=query)
                # Add other searchable fields if necessary
            ).exclude(pk=current_user.pk).distinct()
            print("---------------------")
            print(users_queryset)
            print("---------------------")
            
            users_queryset = users_queryset.annotate(
                last_message=Subquery(latest_chat_subquery.values('Content')[:1]),
                last_message_time=Subquery(latest_chat_subquery.values('Time')[:1]),
            )
            return users_queryset.order_by('-last_message_time', 'username')

        else:
            interacted_user_ids = Chat.objects.filter(
                Q(Sender=current_user) | Q(Receiver=current_user)
            ).exclude( # Exclude self-chats if they were possible or make sense in your model
                Sender=current_user, Receiver=current_user 
            ).values_list('Sender_id', 'Receiver_id')

            partner_ids = set()
            for sender_id, receiver_id in interacted_user_ids:
                if sender_id == current_user.id:
                    partner_ids.add(receiver_id)
                else:
                    partner_ids.add(sender_id)
            
            if not partner_ids:
                return User.objects.none()

            users_queryset = User.objects.filter(id__in=list(partner_ids))
            
            users_queryset = users_queryset.annotate(
                last_message=Subquery(latest_chat_subquery.values('Content')[:1]),
                last_message_time=Subquery(latest_chat_subquery.values('Time')[:1]),
            )
            # We expect these users to have a last_message_time because they are derived from chats
            return users_queryset.filter(last_message_time__isnull=False).order_by('-last_message_time', 'username')

    def perform_create(self, serializer):
        receiver = serializer.validated_data.get('Receiver')
        if receiver == self.request.user:
            raise serializers.ValidationError({"Receiver": "You cannot send a message to yourself."})

        chat_instance = serializer.save(Sender=self.request.user)
        
        # Create Notification
        if hasattr(chat_instance.Receiver, 'username'): # Check if Receiver is a valid user object
            Notification.objects.create(
                User=chat_instance.Receiver, # The user receiving the message
                Message=f"New message from {chat_instance.Sender.username}: {chat_instance.Content[:50]}..." # Truncate for notification
                # Add other relevant fields to Notification like 'related_chat_id=chat_instance.id' if needed
            )

# Your existing ChatBetweenUsersView would remain separate as it serves a different purpose (getting all messages with one specific user)
class ChatBetweenUsersView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, user_id):
        current_user = request.user
        # Ensure user_id is not the current_user's id if you want to prevent fetching self-chats,
        # or handle as per your application logic.
        chats = Chat.objects.filter(
            Q(Sender=current_user, Receiver__id=user_id) |
            Q(Sender__id=user_id, Receiver=current_user)
        ).order_by('Time')
        serializer = ChatSerializer(chats, many=True, context={'request': request})
        return Response(serializer.data)

            

class TutorList(generics.ListAPIView):
    serializer_class = TutorslistSerializer

    def get_queryset(self):
        # Filter GroupClasses where class_type is Free and status is Visible
        free_groupclass_subquery = GroupClass.objects.filter(
            tutor=OuterRef('user'),  # GroupClass.tutor points to User
            class_type='Free',
            status='Visible'
        )

        # Annotate tutors with a boolean indicating if they have free group classes
        return Tutor.objects.annotate(
            has_free_groupclass=Exists(free_groupclass_subquery)
        ).filter(has_free_groupclass=True)
class TutorGroupClassView(APIView):
    def get(self, request, tutor_id):
        group_classes = GroupClass.objects.filter(tutor_id=tutor_id, max_book=1)
        
        if not group_classes.exists():
            return Response({"message": "No group classes found for this tutor with max_book=1."}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = GroupClassSerializer(group_classes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class TutorDetails(generics.RetrieveAPIView):
    serializer_class=TutorslistSerializer
    queryset=Tutor.objects.all()
    lookup_field = 'pk'


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def tutor_dashboard_stats(request):
    # Ensure only tutors can access
    tutor = get_object_or_404(User, pk=request.user.id, Role='Tutor')

    now            = timezone.now()
    current_start  = now - timedelta(days=30)
    previous_start = now - timedelta(days=60)
    previous_end   = current_start

    # 1) totalCourses for this tutor
    total_courses    = GroupClass.objects.filter(tutor=tutor).count()
    courses_current  = GroupClass.objects.filter(
        tutor=tutor,
        date_created__gte=current_start
    ).count()
    courses_previous = GroupClass.objects.filter(
        tutor=tutor,
        date_created__gte=previous_start,
        date_created__lt= previous_end
    ).count()
    growth_courses = (
        (courses_current - courses_previous) / courses_previous * 100
        if courses_previous else 0
    )

    # 2) totalStudents = # of StudentAppointment on tutor's classes
    total_students    = StudentAppointment.objects.filter(
        schedule__group_class__tutor=tutor
    ).count()
    students_current  = StudentAppointment.objects.filter(
        schedule__group_class__tutor=tutor,
        booking_date__gte=current_start
    ).count()
    students_previous = StudentAppointment.objects.filter(
        schedule__group_class__tutor=tutor,
        booking_date__gte=previous_start,
        booking_date__lt= previous_end
    ).count()
    growth_students = (
        (students_current - students_previous) / students_previous * 100
        if students_previous else 0
    )

    # 3) groupClasses: % Paid + growth in Paid creation
    tutor_classes    = GroupClass.objects.filter(tutor=tutor)
    paid_total       = tutor_classes.filter(class_type='Paid').count()
    group_percentage = (paid_total / total_courses * 100) if total_courses else 0

    paid_current  = tutor_classes.filter(
        class_type='Paid',
        date_created__gte=current_start
    ).count()
    paid_previous = tutor_classes.filter(
        class_type='Paid',
        date_created__gte=previous_start,
        date_created__lt= previous_end
    ).count()
    growth_group = (
        (paid_current - paid_previous) / paid_previous * 100
        if paid_previous else 0
    )

    # 4) totalEarnings: sum of Transaction.amount where type='enroll' → tutor
    earnings_current = Transaction.objects.filter(
        receiver=tutor,
        type='enroll',
        created_at__gte=current_start
    ).aggregate(total=Sum('amount'))['total'] or 0

    earnings_previous = Transaction.objects.filter(
        receiver=tutor,
        type='enroll',
        created_at__gte=previous_start,
        created_at__lt= previous_end
    ).aggregate(total=Sum('amount'))['total'] or 0

    growth_earnings = (
        (earnings_current - earnings_previous) / earnings_previous * 100
        if earnings_previous else 0
    )

    return Response({
        "totalCourses": {
            "count":  total_courses,
            "growth": round(growth_courses, 2),
        },
        "totalStudents": {
            "count":  total_students,
            "growth": round(growth_students, 2),
        },
        "groupClasses": {
            "percentage": round(group_percentage, 2),
            "growth":     round(growth_group, 2),
        },
        "totalEarnings": {
            "amount": float(earnings_current),
            "growth": round(growth_earnings, 2),
        },
    }, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def tutor_earnings(request):
    tutor = request.user
    # only “enroll” transactions where the tutor is receiver
    qs = Transaction.objects.filter(receiver=tutor, type='enroll')

    total_transactions = qs.count()
    agg = qs.aggregate(sum_amount=Sum('amount'))
    total_revenue = agg['sum_amount'] or Decimal('0.00')

    # e.g. 10% platform fee
    total_earnings = (total_revenue * Decimal('0.9')).quantize(Decimal('0.01'))

    serializer = TutorEarningsSerializer({
        'total_transactions': total_transactions,
        'total_revenue':      total_revenue,
        'total_earnings':     total_earnings,
    })
    return Response(serializer.data)
