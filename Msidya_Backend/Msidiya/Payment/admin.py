from django.contrib import admin
from unfold.admin import ModelAdmin
from .models import *
class StudentPayementAdmin(ModelAdmin):
    list_display = ('student', 'group_class', 'amount','status','created_on')
    list_filter = ('status', 'group_class')
    # search_fields = ('Sender', 'Time')
    
    
admin.site.register(StudentPayment,StudentPayementAdmin)

