# Generated by Django 2.2.28 on 2022-10-25 17:22

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("payments", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Card",
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
                ("card_number", models.CharField(blank=True, max_length=16, null=True)),
                ("expery_month", models.CharField(blank=True, max_length=2, null=True)),
                ("expery_year", models.CharField(blank=True, max_length=2, null=True)),
                ("cvc", models.CharField(blank=True, max_length=3, null=True)),
                ("primary", models.BooleanField(blank=True, default=False, null=True)),
                (
                    "user",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
    ]