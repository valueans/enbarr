# Generated by Django 2.2.26 on 2022-12-24 09:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0022_auto_20221105_0703"),
    ]

    operations = [
        migrations.AddField(
            model_name="userprofile",
            name="first_name",
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AddField(
            model_name="userprofile",
            name="last_name",
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]
