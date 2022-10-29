# Generated by Django 2.2.28 on 2022-10-26 23:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("payments", "0007_auto_20221025_2059"),
    ]

    operations = [
        migrations.CreateModel(
            name="StripeSetupIntent",
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
                    "setupIntent",
                    models.CharField(blank=True, max_length=1000, null=True),
                ),
                (
                    "intent_secret",
                    models.CharField(blank=True, max_length=1000, null=True),
                ),
                ("status", models.BooleanField(default=False)),
            ],
        ),
        migrations.RemoveField(
            model_name="stripecustomer",
            name="intent_secreat",
        ),
        migrations.RemoveField(
            model_name="stripecustomer",
            name="setup_intent_id",
        ),
        migrations.AddField(
            model_name="stripecustomer",
            name="setup_intent",
            field=models.ManyToManyField(
                related_name="setup_intent", to="payments.StripeSetupIntent"
            ),
        ),
    ]