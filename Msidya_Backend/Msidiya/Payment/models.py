from django.db import models
from Account.models import User
from django.conf import settings  # Assuming user is the Django User model
from chargily_pay import ChargilyClient
from chargily_pay.entity import Checkout, Price

from Group_Class.models import GroupClass
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
    
    
    
    
    
# class AmountCheckout(models.Model):
#     class PAYMENT_STATUS(models.TextChoices):
#         PENDING = "PENDING", "Pending"
#         PAID = "PAID", "Paid"
#         FAILED = "FAILED", "Failed"
#         CANCELED = "CANCELED", "Canceled"
#         EXPIRED = "EXPIRED", "Expired"

#     class PAYMENT_METHOD(models.TextChoices):
#         EDAHABIA = "edahabia", "Edahabia"
#         CIB = "cib", "CIB"

#     class LOCALE(models.TextChoices):
#         ENGLISH = "en", "English"
#         ARABIC = "ar", "Arabic"
#         FRENCH = "fr", "French"

#     amount = models.IntegerField()
#     entity_id = models.CharField(max_length=100, unique=True)
#     payment_method = models.CharField(
#         max_length=10, choices=PAYMENT_METHOD.choices, default=PAYMENT_METHOD.EDAHABIA
#     )
#     customer = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
#     description = models.TextField(null=True, blank=True)
#     locale = models.CharField(max_length=2, choices=LOCALE.choices, default=LOCALE.FRENCH)
#     status = models.CharField(
#         max_length=10, choices=PAYMENT_STATUS.choices, default=PAYMENT_STATUS.PENDING
#     )
#     checkout_url = models.URLField()

#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)

#     # Status update methods
#     def on_paid(self):
#         self.status = self.PAYMENT_STATUS.PAID
#         self.save()

#     def on_failure(self):
#         self.status = self.PAYMENT_STATUS.FAILED
#         self.save()

#     def on_cancel(self):
#         self.status = self.PAYMENT_STATUS.CANCELED
#         self.save()

#     def on_expire(self):
#         self.status = self.PAYMENT_STATUS.EXPIRED
#         self.save()




class StudentPayment(models.Model):
    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='payments')
    group_class = models.ForeignKey(GroupClass, on_delete=models.CASCADE, related_name='payments')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=[('Pending', 'Pending'), ('Completed', 'Completed'), ('Failed', 'Failed')], default='Pending')
    checkout_url = models.URLField(blank=True, null=True)
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Payment by {self.student} for {self.group_class.title}"

    def create_chargily_checkout(self, success_url, failure_url):
        chargily = ChargilyClient(key="test_pk_oJpgEJhNGM0bqmUDCWZRxlLMjSlw1YlI2ekGJu1y", secret="test_sk_qSQ8o3Aa1HRlU5pWrO6lOUT1RnoqG7JyQ629mRRV", url="https://pay.chargily.net/test/api/v2/")
        response = chargily.create_checkout(
            Checkout(
                amount=self.amount,
                currency="dzd",
                success_url=success_url,
                failure_url=failure_url,
            )
        )
        self.checkout_url = response.get("checkout_url")
        self.save()
        return response