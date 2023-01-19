from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

SUBSCRIPTION_PLAN = (
    ("Basic", "Basic"),
    ("Premium", "Premium"),
    ("Platinum", "Platinum"),
)


class StripeSetupIntent(models.Model):
    setupIntent = models.CharField(max_length=1000, null=True, blank=True)
    intent_secret = models.CharField(max_length=1000, null=True, blank=True)
    payment_method_id = models.CharField(max_length=1000, null=True, blank=True)
    ephemeral_key = models.CharField(max_length=1000, null=True, blank=True)
    status = models.BooleanField(default=False)


class Cards(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    last_4 = models.CharField(max_length=4, null=True, blank=True)
    exp_month = models.CharField(max_length=2, null=True, blank=True)
    exp_year = models.CharField(max_length=4, null=True, blank=True)
    payment_id = models.CharField(max_length=1000, null=True, blank=True)
    message = models.CharField(max_length=1000, default="")


class StripeCustomer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    stipe_customerId = models.CharField(max_length=1000, null=True, blank=True)
    setup_intent = models.ManyToManyField(
        StripeSetupIntent, related_name="setup_intent"
    )


class SubscriptionPlans(models.Model):
    title = models.CharField(
        choices=SUBSCRIPTION_PLAN, max_length=100, null=True, blank=True
    )
    description = models.TextField(max_length=1000, null=True, blank=True)
    description_features = models.TextField(max_length=1000, null=True, blank=True)
    price = models.FloatField(null=True, blank=True)
    status = models.BooleanField(default=True)
    stripe_price_id = models.CharField(max_length=1000, null=True, blank=True)
    stripe_product_id = models.CharField(max_length=1000, null=True, blank=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = "Subscription Plans"


class PaymentsHistory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    subscription = models.ForeignKey(
        SubscriptionPlans, on_delete=models.CASCADE, null=True, blank=True
    )
    card = models.ForeignKey(Cards, on_delete=models.CASCADE, null=True, blank=True)
    stripe_invoice_id = models.CharField(max_length=2000, null=True, blank=True)
    stripe_receipt_link = models.CharField(max_length=2000, null=True, blank=True)
    payment_intent_id = models.CharField(max_length=1000, null=True, blank=True)
    amount = models.FloatField(default=0.0)
    status = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
