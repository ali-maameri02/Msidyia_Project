# Generated by Django 4.2.8 on 2025-03-07 20:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Group_Class', '0004_schedule_created_by_alter_schedule_session_link'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='category',
            name='status',
        ),
        migrations.RemoveField(
            model_name='category',
            name='subjects',
        ),
        migrations.RemoveField(
            model_name='subject',
            name='topics',
        ),
        migrations.AddField(
            model_name='category',
            name='active',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='subject',
            name='category',
            field=models.ForeignKey(blank=True, default=None, on_delete=django.db.models.deletion.CASCADE, related_name='subjects', to='Group_Class.category'),
        ),
        migrations.AddField(
            model_name='topic',
            name='subject',
            field=models.ForeignKey(blank=True, default=None, on_delete=django.db.models.deletion.CASCADE, related_name='topics', to='Group_Class.subject'),
        ),
        migrations.AlterField(
            model_name='category',
            name='name',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='subject',
            name='name',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='topic',
            name='name',
            field=models.CharField(max_length=255),
        ),
    ]
