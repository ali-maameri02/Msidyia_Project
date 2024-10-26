# In Account/context_processors.py
from .models import Notification

def admin_context_processor(request):
    unread_count = Notification.objects.filter(Status=False).count()
    return {'unread_notifications': unread_count}
