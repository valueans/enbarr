# Generated by Django 2.2.28 on 2022-10-24 23:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("home", "0012_horses_approved"),
    ]

    operations = [
        migrations.CreateModel(
            name="FeedBack",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("email", models.EmailField(max_length=254)),
                ("message", models.TextField()),
            ],
        ),
    ]
