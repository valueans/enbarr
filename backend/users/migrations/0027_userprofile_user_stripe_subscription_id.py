# Generated by Django 2.2.26 on 2023-01-18 10:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0026_userprofile_subscription_adds"),
    ]

    operations = [
        migrations.AddField(
            model_name="userprofile",
            name="user_stripe_subscription_id",
            field=models.CharField(blank=True, max_length=1000, null=True),
        ),
    ]
