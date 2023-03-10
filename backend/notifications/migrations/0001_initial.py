# Generated by Django 2.2.28 on 2023-02-24 18:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ("django_celery_beat", "0016_alter_crontabschedule_timezone"),
    ]

    operations = [
        migrations.CreateModel(
            name="Notifications",
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
                (
                    "description",
                    models.TextField(blank=True, max_length=1000, null=True),
                ),
                ("message_profile_url", models.TextField(blank=True, null=True)),
                ("read_status", models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name="PushNotificationsAdmin",
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
                ("name", models.CharField(blank=True, max_length=1000, null=True)),
                (
                    "send_to",
                    models.CharField(
                        blank=True,
                        choices=[
                            ("ALL", "ALL"),
                            ("SUBSCRIBED", "SUBSCRIBED"),
                            ("UN-SUBSCRIBED", "UN-SUBSCRIBED"),
                        ],
                        max_length=20,
                        null=True,
                    ),
                ),
                ("active", models.BooleanField(default=True)),
                (
                    "run_at",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        to="django_celery_beat.CrontabSchedule",
                    ),
                ),
            ],
            options={
                "verbose_name_plural": "Push Notifications",
            },
        ),
    ]
