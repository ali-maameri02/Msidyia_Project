import json
import requests
from rest_framework.response import Response
from rest_framework import generics
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.core.exceptions import ObjectDoesNotExist
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

class TutorList(generics.ListAPIView):
    serializer_class=TutorslistSerializer
    queryset=Tutor.objects.all()

class TutorDetails(generics.RetrieveAPIView):
    serializer_class=TutorslistSerializer
    queryset=Tutor.objects.all()
    lookup_field = 'pk'

       
