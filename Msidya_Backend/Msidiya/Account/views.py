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

class RegisterUserView(generics.CreateAPIView):
    serializer_class = UserSerializer

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
                'token': token.key,
                'message': 'successful login',
                'profile_picture': profile_picture_url,
                'username': username,
                'user_role': user_role,
            }, status=status.HTTP_200_OK)

        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    
    
class TutorUpdate(generics.RetrieveUpdateAPIView):
    queryset = Tutor.objects.all()
    serializer_class = TutorSerializer

    def get_object(self):
        # Fetching the tutor object based on the user ID from the URL
        user_id = self.kwargs.get('id')
        return Tutor.objects.get(user_id=user_id)  # Fetch Tutor by related user's ID
    
class StudentUpdate(generics.RetrieveUpdateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

    def get_object(self):
        # Fetching the tutor object based on the user ID from the URL
        user_id = self.kwargs.get('id')
        return Student.objects.get(user_id=user_id)  # Fetch Tutor by related user's ID
    
class Ms_SellerUpdate(generics.RetrieveUpdateAPIView):
    queryset = Ms_Seller.objects.all()
    serializer_class = Ms_SellerSerializer

    def get_object(self):
        # Fetching the tutor object based on the user ID from the URL
        user_id = self.kwargs.get('id')
        return Ms_Seller.objects.get(user_id=user_id)  # Fetch Tutor by related user's ID

class Users(generics.ListAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.all()  # Add parentheses here