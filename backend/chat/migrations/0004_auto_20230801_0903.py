# Generated by Django 2.2.28 on 2023-08-01 09:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0003_conversation_blocked'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='conversation',
            name='blocked',
        ),
        migrations.AddField(
            model_name='conversation',
            name='blocked_user_one',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='conversation',
            name='blocked_user_two',
            field=models.BooleanField(default=False),
        ),
    ]