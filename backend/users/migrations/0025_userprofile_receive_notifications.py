# Generated by Django 2.2.26 on 2023-01-17 01:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0024_auto_20230117_0053"),
    ]

    operations = [
        migrations.AddField(
            model_name="userprofile",
            name="receive_notifications",
            field=models.BooleanField(default=True),
        ),
    ]