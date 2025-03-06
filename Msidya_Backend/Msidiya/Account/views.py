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
            profile_picture_url = serializer.data.get('profile_picture', None)
            username = serializer.data.get('username', None)
            user_role = serializer.data.get('Role', None)

            return Response({
                'id':user.id,
                'token': token.key,
                'message': 'successful login',
                'profile_picture': profile_picture_url,
                'username': username,
                'user_role': user_role,
            }, status=status.HTTP_200_OK)

        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
class Users(generics.ListAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.all()  # Add parentheses here 
    
class Userretreive(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'pk'

class UserUpdateView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserUpdateSerializer
    lookup_field = 'pk'

    def get_serializer(self, *args, **kwargs):
        # Let DRF handle 'partial' automatically; no need to pass it manually
        return super().get_serializer(*args, **kwargs)  
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

    def get_user(self):
        return self.request.data.get('user')

    def get_queryset(self):
        user = self.get_user()
        return Chat.objects.filter(Sender=user) if user else Chat.objects.none()
    
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

    

       