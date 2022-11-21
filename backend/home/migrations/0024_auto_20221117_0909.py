# Generated by Django 2.2.28 on 2022-11-17 09:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("home", "0023_auto_20221117_0907"),
    ]

    operations = [
        migrations.AlterField(
            model_name="contactus",
            name="email",
            field=models.EmailField(blank=True, max_length=254, null=True),
        ),
        migrations.AlterField(
            model_name="contactus",
            name="first_name",
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name="contactus",
            name="last_name",
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name="contactus",
            name="query",
            field=models.TextField(blank=True, max_length=1000, null=True),
        ),
    ]