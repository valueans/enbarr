from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import SubscriptionPlans
from django.conf import settings
import stripe

stripe.api_key = settings.STRIPE_SECRET_KEY


def createStripeProduct(name):
    response = stripe.Product.create(name=name, active=True)
    return response


def createStripeProductPricing(instance):
    response = stripe.Price.create(
        unit_amount=int(instance.price * 100),
        currency="usd",
        recurring={"interval": "month"},
        product=instance.stripe_product_id,
        active=True,
    )
    return response


@receiver(post_save, sender=SubscriptionPlans)
def create_notification_report(sender, instance, created, **kwargs):
    if created:
        if instance.title != "Basic":
            product_response = createStripeProduct(instance.title)
            instance.stripe_product_id = product_response.id
            price_response = createStripeProductPricing(instance)
            instance.stripe_price_id = price_response.id
            instance.save()
