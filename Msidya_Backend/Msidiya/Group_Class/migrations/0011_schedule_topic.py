# Generated by Django 4.2.8 on 2025-05-02 17:01

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Group_Class', '0010_studentappointment'),
    ]

    operations = [
        migrations.AddField(
            model_name='schedule',
            name='topic',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to='Group_Class.topic'),
        ),
    ]
