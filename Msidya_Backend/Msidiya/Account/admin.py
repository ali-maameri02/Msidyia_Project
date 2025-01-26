from django.contrib import admin
from django.utils.html import format_html
from django.forms.widgets import Widget
from .models import User, Chat, Notification
from unfold.admin import ModelAdmin
from Payment.models import *
from Group_Class.models import *

from Payment.models import *
# admin.site.register(Schedule)

# admin.site.register(StudentPayment)
class WebPImageWidget(Widget):
    def render(self, name, value, attrs=None, renderer=None):
        if value:
            return format_html('<img src="{}" width="50" />', value.url)
        return "No Image"


# class CustomAdminSite(admin.AdminSite):
#     site_header = 'Custom Admin'
#     site_title = 'Custom Admin Portal'
#     index_title = 'Welcome to the Admin Panel'

#     def each_context(self, request):
#         context = super().each_context(request)
#         # Add unread notification count to the admin context
#         context['unread_notifications'] = Notification.objects.filter(Status=False).count()
#         return context


# custom_admin_site = CustomAdminSite(name='custom_admin')


class CustomUserAdmin(ModelAdmin):
    list_display = ('username', 'first_name', 'last_name', 'email', 'Role', 'profile_picture_thumbnail')
    list_filter = ('Role', 'Gender')
    search_fields = ('username', 'first_name', 'last_name', 'email', 'telephone')

    def profile_picture_thumbnail(self, obj):
        if obj.Picture:
            return format_html('<img src="{}" width="50" height="50" style="border-radius: 50%;" />', obj.Picture.url)
        return format_html('<img src="{}" width="30" style="border-radius: 50%;" />', '/static/admin/img/avatar2.svg')


class MessagesAdmin(ModelAdmin):
    list_display = ('Sender', 'Content', 'Time')
    list_filter = ('Sender', 'Time')
    search_fields = ('Sender', 'Time')



class NotificationAdmin(ModelAdmin):
    list_display = ('User', 'Message', 'Status')
    list_filter = ('Status',)
    search_fields = ('User__username', 'Message')


class StudentPayementAdmin(ModelAdmin):
    list_display = ('student', 'group_class', 'amount','status')
    list_filter = ('status','group_class')


# Register models with the custom admin site
admin.site.register(StudentPayment, StudentPayementAdmin)
admin.site.register(User, CustomUserAdmin)
admin.site.register(Chat, MessagesAdmin)
admin.site.register(Notification, NotificationAdmin)
