import json
from django.db.models import F, Q, OuterRef, Subquery
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
    serializer_class=TutorslistSerializer
    queryset=Tutor.objects.all()

class TutorDetails(generics.RetrieveAPIView):
    serializer_class=TutorslistSerializer
    queryset=Tutor.objects.all()
    lookup_field = 'pk'

