from django.contrib import admin

from .models import *
from Payment.models import *
admin.site.register(Schedule)
# admin.site.register(StudentPayment)

admin.site.register(Category)
admin.site.register(GroupClass)
