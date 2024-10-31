from django.db import models
from Account.models import User

class Currency(models.Model):
    symbol = models.CharField(max_length=10)
    name = models.CharField(max_length=50)
    converting_wallet = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.name} ({self.symbol})"

class PaymentAccount(models.Model):
    METHOD_CHOICES = [
        ('Paypal', 'Paypal'),
        ('DAHABIA', 'DAHABIA'),
        ('MS', 'MS'),
    ]

    method = models.CharField(max_length=20, choices=METHOD_CHOICES)
    receipt_name = models.CharField(max_length=100)
    paypal_account = models.CharField(max_length=100, blank=True, null=True)
    account_ccp = models.CharField(max_length=20, blank=True, null=True)
    bank_name = models.CharField(max_length=100, blank=True, null=True)
    bank_address = models.CharField(max_length=200, blank=True, null=True)
    iban_number = models.CharField(max_length=34, blank=True, null=True)
    created_on = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='payment_accounts')

    def __str__(self):
        return f"{self.method} account for {self.user.username}"

class Payout(models.Model):
    STATUS_CHOICES = [
        ('Approved', 'Approved'),
        ('Pending', 'Pending'),
        ('Failed', 'Failed'),
    ]

    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')
    commission_platform = models.DecimalField(max_digits=5, decimal_places=2)
    balance = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateTimeField(auto_now_add=True)
    payment_account = models.ForeignKey(PaymentAccount, on_delete=models.CASCADE, related_name='payouts')

    def __str__(self):
        return f"Payout of {self.amount} for {self.payment_account}"
