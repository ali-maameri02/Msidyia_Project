from django.db import models

# Category Model
class Category(models.Model):
    name = models.CharField(max_length=100)
    status = models.CharField(max_length=20, choices=[('accepted', 'Accepted'), ('refused', 'Refused'), ('in_progress', 'In Progress')])


# Subject Model
class Subject(models.Model):
    name = models.CharField(max_length=100)
    category = models.ForeignKey(Category, related_name='subjects', on_delete=models.CASCADE)

# Topic Model
class Topic(models.Model):
    name = models.CharField(max_length=100)
    subject = models.ForeignKey(Subject, related_name='topics', on_delete=models.CASCADE)


# Group Class Model
class GroupClass(models.Model):
    title = models.CharField(max_length=255)
    age_range = models.CharField(max_length=50)
    grade = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=10)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)
    max_book = models.PositiveIntegerField()
    class_type = models.CharField(max_length=10, choices=[('Free', 'Free'), ('Paid', 'Paid')])
    main_image = models.ImageField(upload_to='group_class_images/')
    course_material = models.FileField(upload_to='course_materials/', blank=True, null=True)
    date_created = models.DateTimeField(auto_now_add=True)
    slot = models.CharField(max_length=50)
    status = models.CharField(max_length=10, choices=[('Visible', 'Visible'), ('Hidden', 'Hidden')])
    last_time = models.DateTimeField()


# Group Class Review Model
class GroupClassReview(models.Model):
    group_class = models.ForeignKey(GroupClass, related_name='reviews', on_delete=models.CASCADE)
    rating = models.IntegerField()
    comment = models.TextField()

# Report Model
class Report(models.Model):
    message = models.TextField()
    date = models.DateTimeField(auto_now_add=True)

# Schedule Model
class Schedule(models.Model):
    group_class = models.ForeignKey(GroupClass, related_name='schedules', on_delete=models.CASCADE)
    date = models.DateField()
    duration = models.DurationField()
    session_link = models.URLField()

# Discount Model (Assuming it's related to Group Class)
class Discount(models.Model):
    group_class = models.ForeignKey(GroupClass, related_name='discounts', on_delete=models.CASCADE)
    percentage = models.DecimalField(max_digits=5, decimal_places=2)
    description = models.TextField(blank=True)
