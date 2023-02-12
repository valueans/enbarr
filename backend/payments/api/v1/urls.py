from django.urls import path
from .views import (
    plansView,
    setupIntentStripeView,
    paymentMethods,
    stripe_webhook,
    upgradeSubscriptionView,
    unsubscripeSubscription,
)

urlpatterns = [
    path("plans/", plansView, name="plans"),
    path(
        "customer-intent-stripe/", setupIntentStripeView, name="customer-intent-stripe"
    ),
    path("paymentMethods/", paymentMethods, name="paymentMethods"),
    path("stripe-webhook/", stripe_webhook, name="stripe_webhook"),
    path(
        "updagradeSubscription/", upgradeSubscriptionView, name="upgrade_subscription"
    ),
    path(
        "unsubscribeSubscription/",
        unsubscripeSubscription,
        name="unsubscribe_subscription",
    ),
]
