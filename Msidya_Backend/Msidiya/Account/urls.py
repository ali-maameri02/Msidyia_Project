from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import *

urlpatterns = [
    path('signup/', RegisterUserView.as_view(), name='signup'),
    path('login/', user_login, name='login'),
    path('users/', Users.as_view(), name='users'),
    path('users/<int:pk>/update/', UserUpdateView.as_view(), name='update'),
    path('chat/sent', SentMessageView.as_view(), name='update'),
    path('notifications/', NotificationListView.as_view(), name='notification-list'),
    path('notifications/<int:pk>/read/', NotificationUpdateView.as_view(), name='notification-update'),

    
]