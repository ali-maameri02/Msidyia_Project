from django.db import models
from Account.models import User
from .lessonspace_api import create_lessonspace_room

# Topic Model
class Topic(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self) :
        return self.name

# Subject Model
class Subject(models.Model):
    name = models.CharField(max_length=100)
    topics = models.ManyToManyField(Topic,blank=True)
    def __str__(self) :
        return self.name

# Category Model
class Category(models.Model):
    tutor = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=100)
    status = models.CharField(max_length=20, choices=[('accepted', 'Accepted'), ('refused', 'Refused'), ('in_progress', 'In Progress')] , default='In Progress')
    subjects = models.ManyToManyField(Subject,blank=True)
    logo = models.ImageField( upload_to='Categories_logos/', height_field=None, width_field=None, max_length=None,blank=True,null=True)
    def __str__(self) :
        return self.name

# GroupClass Model
class GroupClass(models.Model):
    tutor = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    age_range = models.CharField(max_length=50)
    grade = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    max_book = models.PositiveIntegerField()
    class_type = models.CharField(max_length=10, choices=[('Free', 'Free'), ('Paid', 'Paid')])
    main_image = models.ImageField(upload_to='group_class_images/')
    date_created = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=10, choices=[('Visible', 'Visible'), ('Hidden', 'Hidden')])
    last_time = models.DateTimeField()
    def __str__(self) :
        return self.title
# Schedule Model
class Schedule(models.Model):
    group_class = models.ForeignKey(GroupClass, related_name='schedules', on_delete=models.CASCADE)
    date = models.DateTimeField()
    duration = models.DurationField()
    session_link = models.URLField(blank=True, null=True)  # Automatically generated
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name="schedules_created")

    def save(self, *args, **kwargs):
     if not self.session_link:
        try:
            space_name = f"{self.group_class.title} - Session"
            self.session_link = create_lessonspace_room(space_name=space_name)
        except Exception as e:
            print(f"Error creating Lessonspace room: {e}")
            # Optionally: Log the error or notify an admin
        super().save(*args, **kwargs)


# File Model
class File(models.Model):
    group_class = models.ForeignKey(GroupClass, related_name='course_materials', on_delete=models.CASCADE)
    content = models.FileField(upload_to='course_materials/', blank=True, null=True)

# GroupClassReview Model
class GroupClassReview(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    group_class = models.ForeignKey(GroupClass, related_name='reviews', on_delete=models.CASCADE)
    rating = models.IntegerField()
    comment = models.TextField()

# Report Model
class Report(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.TextField()
    date = models.DateTimeField(auto_now_add=True)

# Discount Model
class Discount(models.Model):
    group_class = models.ForeignKey(GroupClass, related_name='discounts', on_delete=models.CASCADE)
    value = models.DecimalField(max_digits=5, decimal_places=2)
    discount_type = models.CharField(max_length=15, choices=[('Amount', 'Amount'), ('Percentage', 'Percentage')])