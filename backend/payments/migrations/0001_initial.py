# Generated by Django 2.2.28 on 2023-02-24 18:52

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Cards",
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
                ("last_4", models.CharField(blank=True, max_length=4, null=True)),
                ("exp_month", models.CharField(blank=True, max_length=2, null=True)),
                ("exp_year", models.CharField(blank=True, max_length=4, null=True)),
                (
                    "payment_id",
                    models.CharField(blank=True, max_length=1000, null=True),
                ),
                ("message", models.CharField(default="", max_length=1000)),
                ("active", models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name="PaymentsHistory",
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
                    "stripe_invoice_id",
                    models.CharField(blank=True, max_length=2000, null=True),
                ),
                (
                    "stripe_receipt_link",
                    models.CharField(blank=True, max_length=2000, null=True),
                ),
                (
                    "payment_intent_id",
                    models.CharField(blank=True, max_length=1000, null=True),
                ),
                ("amount", models.FloatField(default=0.0)),
                ("status", models.BooleanField(default=False)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
        ),
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
                (
                    "payment_method_id",
                    models.CharField(blank=True, max_length=1000, null=True),
                ),
                (
                    "ephemeral_key",
                    models.CharField(blank=True, max_length=1000, null=True),
                ),
                ("status", models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name="SubscriptionPlans",
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
                    "title",
                    models.CharField(
                        blank=True,
                        choices=[
                            ("Basic", "Basic"),
                            ("Premium", "Premium"),
                            ("Platinum", "Platinum"),
                        ],
                        max_length=100,
                        null=True,
                    ),
                ),
                (
                    "description",
                    models.TextField(blank=True, max_length=1000, null=True),
                ),
                (
                    "description_features",
                    models.TextField(blank=True, max_length=1000, null=True),
                ),
                ("price", models.FloatField(blank=True, null=True)),
                ("status", models.BooleanField(default=True)),
                (
                    "stripe_price_id",
                    models.CharField(blank=True, max_length=1000, null=True),
                ),
                (
                    "stripe_product_id",
                    models.CharField(blank=True, max_length=1000, null=True),
                ),
            ],
            options={
                "verbose_name_plural": "Subscription Plans",
            },
        ),
        migrations.CreateModel(
            name="StripeCustomer",
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
                    "stipe_customerId",
                    models.CharField(blank=True, max_length=1000, null=True),
                ),
                (
                    "setup_intent",
                    models.ManyToManyField(
                        related_name="setup_intent", to="payments.StripeSetupIntent"
                    ),
                ),
            ],
        ),
    ]
