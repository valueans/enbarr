# Generated by Django 2.2.28 on 2023-03-01 17:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('notifications', '0003_notifications_type'),
    ]

    operations = [
        migrations.AddField(
            model_name='notifications',
            name='channel_id',
            field=models.CharField(blank=True, max_length=1000, null=True),
        ),
        migrations.AddField(
            model_name='notifications',
            name='horse_id',
            field=models.CharField(blank=True, max_length=1000, null=True),
        ),
    ]
