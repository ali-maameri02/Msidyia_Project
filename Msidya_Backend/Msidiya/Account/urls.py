from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import *

urlpatterns = [
    path('signup/', RegisterUserView.as_view(), name='signup'),
    path('login/', user_login, name='login'),
    path('users/', Users.as_view(), name='users'),
    path('Users/<int:pk>/', Userretreive.as_view(), name='Users'),
    path('users/<int:pk>/update/', UserUpdateView.as_view(), name='update'),
    path('users/<int:pk>/delete/', UserDelete.as_view(), name='delete'),
    path('chat/sent', SentMessageView.as_view(), name='update'),
    path('notifications/', NotificationListView.as_view(), name='notification-list'),
    path('notifications/<int:pk>/read/', NotificationUpdateView.as_view(), name='notification-update'),
    path('qualification/',QualificationListcreatview.as_view(),name='Qualification')
    
]