# Generated by Django 2.2.28 on 2022-11-01 04:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("notifications", "0002_pushnotificationsadmin"),
    ]

    operations = [
        migrations.AlterField(
            model_name="pushnotificationsadmin",
            name="run_at",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to="django_celery_beat.CrontabSchedule",
            ),
        ),
    ]