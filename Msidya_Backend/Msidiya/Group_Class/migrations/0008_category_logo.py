# Generated by Django 4.2.8 on 2025-04-04 15:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Group_Class', '0007_category_tutor'),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='logo',
            field=models.ImageField(blank=True, null=True, upload_to='Categories_logos/'),
        ),
    ]
