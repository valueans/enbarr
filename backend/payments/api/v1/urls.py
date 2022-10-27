from django.urls import path
from .views import (
    plansView,
    setupIntentStripeView,
    paymentMethods,
    checkoutSubscribePlan,
    stripe_webhook,
)

urlpatterns = [
    path("plans/", plansView, name="plans"),
    path(
        "customer-intent-stripe/", setupIntentStripeView, name="customer-intent-stripe"
    ),
    path("paymentMethods/", paymentMethods, name="paymentMethods"),
    path("checkout/", checkoutSubscribePlan, name="checkout"),
    path("stripe-webhooks/", stripe_webhook, name="stripe_webhook"),
]
