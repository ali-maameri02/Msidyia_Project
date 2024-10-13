from django.db import models
from django.contrib.auth.models import AbstractUser

# Custom User model
class User(AbstractUser):
    phone_number = models.CharField(max_length=15, unique=True)
    picture = models.ImageField(upload_to='profile_pics/', null=True, blank=True)
    gender = models.CharField(max_length=10, choices=[('Male', 'Male'), ('Female', 'Female')], null=True)
    age = models.IntegerField(null=True, blank=True)

    ROLE_CHOICES = [
        ('Student', 'Student'),
        ('Teacher', 'Teacher'),
        ('Ms_seller', 'Ms_seller')
    ]
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)

# Messages model
class Message(models.Model):
    sender = models.ForeignKey(User, related_name='sent_messages', on_delete=models.CASCADE)
    receiver = models.ForeignKey(User, related_name='received_messages', on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

# Notification model
class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.ForeignKey(Message, on_delete=models.CASCADE)
    status = models.BooleanField(default=False)  # True for read, False for unread
    created_at = models.DateTimeField(auto_now_add=True)

# Wallet Model
class Ms_Wallet(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    balance = models.DecimalField(max_digits=10, decimal_places=2)

# Transactions model
class Transaction(models.Model):
    wallet = models.ForeignKey(Ms_Wallet, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    status_choices = [
        ('Pending', 'Pending'),
        ('Completed', 'Completed'),
        ('Cancelled', 'Cancelled')
    ]
    status = models.CharField(max_length=10, choices=status_choices)

# Ms_seller model
class Ms_Seller(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    intro_video = models.URLField()
    identity_verification = models.FileField(upload_to='identity_docs/')

# Student model
class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    grade = models.CharField(max_length=10)

# Tutor model
class Tutor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    cover_letter = models.TextField()
    identity_verification = models.FileField(upload_to='identity_docs/')
    teaches = models.ManyToManyField('Subject', through='Teaches')

# Education Qualification model
class EducationalQualification(models.Model):
    tutor = models.ForeignKey(Tutor, on_delete=models.CASCADE)
    qualification = models.CharField(max_length=100)
    status = models.CharField(max_length=10, choices=[('Verified', 'Verified'), ('Pending', 'Pending')])

# Tutor Review
class TutorReview(models.Model):
    tutor = models.ForeignKey(Tutor, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    rating = models.IntegerField()
    comment = models.TextField()

# Favorite Tutor
class FavoriteTutor(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    tutor = models.ForeignKey(Tutor, on_delete=models.CASCADE)
