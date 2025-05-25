from django.contrib import admin
from .models import Wallet, Payment, Transaction

admin.site.register(Wallet)
admin.site.register(Payment)
admin.site.register(Transaction)