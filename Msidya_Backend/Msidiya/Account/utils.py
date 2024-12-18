from datetime import timedelta
from django.utils import timezone  # Import Django's timezone utility
from Account.models import User,Notification

def badge_callback(request):
    # Count users who joined in the last 7 days
    new_users_count = User.objects.filter(date_joined__gte=timezone.now() - timedelta(days=7)).count()
    return new_users_count  # This will display as a badge count

def notification_badge_callback(request):
    # Count users who joined in the last 7 days
    new_notifications_count = Notification.objects.all().count()
    return new_notifications_count  # This will display as a badge count
