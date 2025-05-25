from django.db import models
from django.conf import settings
from django.utils import timezone
from django.db.models.signals import post_save
from django.dispatch import receiver

User = settings.AUTH_USER_MODEL

class Wallet(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='wallet')
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)

    def __str__(self):
        return f"{self.user.username}'s Wallet - {self.balance} coins"

class Payment(models.Model):
    GATEWAY_CHOICES = (
        ('paypal', 'PayPal'),
        ('dahabia', 'Dahabia'),
    )



    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='ewallet_payments')
    gateway = models.CharField(max_length=20, choices=GATEWAY_CHOICES)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    coins_purchased = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(default=timezone.now)
    successful = models.BooleanField(default=False)
    gateway_transaction_id = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return f"Payment by {self.user.username} - {self.amount} USD → {self.coins_purchased} coins"

class Transaction(models.Model):
    TYPE_CHOICES = (
        ('send', 'Send'),
        ('receive', 'Receive'),
        ('enroll', 'Enroll'),
        ('launch_class', 'Launch Class'),
        ('refund', 'Refund'),
    )

    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='transactions_sent', null=True, blank=True)
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='transactions_received', null=True, blank=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    type = models.CharField(max_length=30, choices=TYPE_CHOICES)
    note = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        sender = self.sender.username if self.sender else "System"
        receiver = self.receiver.username if self.receiver else "System"
        return f"{self.type.capitalize()} - {self.amount} coins ({sender} → {receiver})"

# Signal to create corresponding role objects based on the role selected
@receiver(post_save, sender=User)
def create_role_instance(sender, instance, created, **kwargs):
    if created:
        if instance.Role == 'Student':
            Wallet.objects.create(user=instance,balance=0)
            
