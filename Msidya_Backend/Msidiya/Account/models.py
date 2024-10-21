from django.db import models
from django.contrib.auth.models import AbstractUser 
from django.contrib.auth.hashers import make_password
from django.utils.crypto import get_random_string
from django.db.models.signals import post_save
from django.dispatch import receiver

class User(AbstractUser):
    # You can add fields that you want in your form not included in the Abstract User here
    # e.g Gender = model.CharField(max_length=10)
    USER_ROLE = (
        ('Student', 'Student'),
        ('Tutor', 'Tutor'),
        ('Ms_seller', 'Ms_seller'),
    )
    Gender = (
        ('Male', 'Male'),
        ('Female', 'Female'),
        
    )
    Role = models.CharField(max_length=20, choices=USER_ROLE)
    Phone_number = models.CharField( max_length=11, null=True , default=None)
    Paypal_Email = models.EmailField(max_length=254,null=True)
    Address = models.CharField(max_length=300,null=True)
    Zip_code = models.DecimalField(null=True,max_digits=5, decimal_places=5)
    Picture = models.ImageField( upload_to='Profiles/', height_field=None, width_field=None, max_length=None)
    def save(self, *args, **kwargs):
        if self.pk is None:  # Only hash the password when creating a new user
            self.password = make_password(self.password)
        super().save(*args, **kwargs)
    def __str__(self):
        return self.username



class Tutor (models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE , null=True , default=None)  # One-to-one relation with User
    Cover = models.ImageField(upload_to='Cover/', height_field=None, width_field=None, max_length=None)    
    Description = models.CharField(null=True, max_length=50)
    Intro_video = models.FileField( upload_to='Intro_Videos/', max_length=None )
    Verification_Id = models.BooleanField(default=False)
    def __str__(self):
         return self.user

class Student (models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE , null=True , default=None)  # One-to-one relation with User
    Grade  = models.CharField(null=True, max_length=50)
    
class Ms_Seller (models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True , default=None)  # One-to-one relation with User
    Description = models.CharField(null=True, max_length=50)
    Intro_video = models.FileField( upload_to='Intro_Videos/', max_length=None )
    Verification_Id = models.BooleanField(default=False)



# Signal to create corresponding role objects based on the role selected
@receiver(post_save, sender=User)
def create_role_instance(sender, instance, created, **kwargs):
    if created:
        if instance.Role == 'Tutor':
            Tutor.objects.create(user=instance)
        elif instance.Role == 'Student':
            Student.objects.create(user=instance)
        elif instance.Role == 'Ms_seller':
            Ms_Seller.objects.create(user=instance)
            
            
class Transaction (models.Model):
    
       TRANSACTION_METHODS = (
        ('Paypal', 'Paypal'),
        ('Dahabia', 'Dahabia'),
        ('MS', 'Ms'),
       )  
       STATUS = (
        ('Pending', 'Pending'),
        ('Booked', 'Booked'),
        ('Refunded', 'Refunded'),
        ('Pending_Refund', 'Pending_Refund'),
        ('Canceled', 'Canceled'),
        ('In_Progress', 'In_Progress'),
       ) 
       User = models.ForeignKey(User,  on_delete=models.CASCADE)
       Payment_Metode = models.CharField( max_length=50,choices=TRANSACTION_METHODS) 
       Status = models.CharField( max_length=50,choices=STATUS) 
       Created_On = models.DateTimeField( auto_now_add=True)
       
class Notification(models.Model):
    User = models.ForeignKey(User,  on_delete=models.CASCADE) 
    Message = models.CharField(max_length=100)
    Status = models.BooleanField(default=False)     
      
class Chat(models.Model):
    Content = models.CharField(max_length=100)     
    Sender = models.ForeignKey(User,  on_delete=models.CASCADE, related_name='Sent_messages',)    
    Receiver = models.ForeignKey(User,  on_delete=models.CASCADE , related_name='received_messages',)    
    Time = models.DateTimeField(auto_now_add=True)     
       
       
class Ms_wallet (models.Model):
    User = models.OneToOneField(User, null=True, on_delete=models.CASCADE)
    Amount = models.DecimalField(max_digits=10, decimal_places=5)
    
    
    
    
