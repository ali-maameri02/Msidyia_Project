from django.contrib import admin
from .models import *
from django.utils.html import format_html
from django.forms.widgets import Widget



class WebPImageWidget(Widget):
    def render(self, name, value, attrs=None, renderer=None):
        if value:
            return format_html('<img src="{}" width="50" />', value.url)
        return "No Image"


class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('username', 'first_name', 'last_name',  'email', 'Role',
                    'profile_picture_thumbnail')
    list_filter = ('Role','Gender')
    search_fields = ('username', 'first_name',
                     'last_name', 'email', 'telephone')

    def profile_picture_thumbnail(self, obj):
        if obj.Picture:
            return format_html('<img src="{}" width="50" height="50" style="border-radius: 50%;" />',
                               obj.Picture.url)
        return format_html('<img src="{}" width="30" style="border-radius: 50%;" />', '/static/admin/img/avatar2.svg')
class Messages(admin.ModelAdmin):
    list_display = ('Sender','Content', 'Time')
    list_filter = ('Sender','Time')
    search_fields = ('Sender', 'Time')
    
admin.site.register(User,CustomUserAdmin)
admin.site.register(Chat,Messages)