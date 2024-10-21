from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import *

urlpatterns = [
    path('signup/', RegisterUserView.as_view(), name='signup'),
    path('login/', user_login, name='login'),
    path('users/', Users.as_view(), name='users'),
    path('updateTutor/<int:id>/', TutorUpdate.as_view(), name='updateTutor'),
    path('updateStudent/<int:id>/', StudentUpdate.as_view(), name='updateStudent'),
    path('updateMs_Seller/<int:id>/', Ms_SellerUpdate.as_view(), name='updateMs_Seller'),
]