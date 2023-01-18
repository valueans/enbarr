from payments.models import *
import stripe
from django.conf import settings
from payments.models import StripeSetupIntent
from django_celery_beat.models import PeriodicTask
from django_celery_beat.models import CrontabSchedule
import json
from datetime import datetime
from dateutil.relativedelta import relativedelta

stripe.api_key = settings.STRIPE_SECRET_KEY


def createStripeCustomer(user):
    # check if the user is already a stripe customer
    try:
        stipe_customer = StripeCustomer.objects.get(user=user)
    except:
        # if the user is not a stripe customer it create him a new stripe customer
        response = stripe.Customer.create(email=user.email)
        stipe_customer = StripeCustomer.objects.create(
            user=user, stipe_customerId=response["id"]
        )
    return stipe_customer.stipe_customerId


def createSetupIntentCustomer(user):
    # create a new setup intent to add a new card for customer.
    stripe_customer = StripeCustomer.objects.get(user=user)
    response = stripe.SetupIntent.create(
        payment_method_types=["card"], customer=stripe_customer.stipe_customerId
    )
    ephemeralKey = stripe.EphemeralKey.create(
        customer=stripe_customer.stipe_customerId,
        stripe_version="2022-08-01",
    )
    setup_intent_obj = StripeSetupIntent.objects.create(
        setupIntent=response["id"],
        intent_secret=response["client_secret"],
        ephemeral_key=ephemeralKey.secret,
    )
    stripe_customer.setup_intent.add(setup_intent_obj)
    stripe_customer.save()
    return setup_intent_obj


def getPaymentMethodDetails(method_id):
    # get the payment method details for specific setup intent
    response = stripe.PaymentMethod.retrieve(method_id)
    return response


def createStripeSubcription(user):
    if (
        user.userprofile.user_stripe_subscription_id != ""
        or user.userprofile.user_stripe_subscription_id != None
    ):
        updateStripeSubcription(user)
    else:
        customer_id = createStripeCustomer(user)
        response = stripe.Subscription.create(
            customer=customer_id,
            items=[
                {"price": user.userprofile.subscription_plan.stripe_price_id},
            ],
        )
        user.userprofile.subscription_start_date = datetime.now()
        user.userprofile.subscription_renew_date = datetime.now() + relativedelta(
            months=+1
        )
        user.userprofile.user_stripe_subscription_id = response.id
        user.userprofile.save()
        return response


def updateStripeSubcription(user):
    response = stripe.Subscription.modify(
        user.userprofile.user_stripe_subscription_id,
        items=[
            {"price": user.userprofile.subscription_plan.stripe_price_id},
        ],
    )
    print("this is response",response)
    user.userprofile.user_stripe_subscription_id = response.id
    user.userprofile.save()
    return response


def deleteSubscription(user):
    if user.userprofile.subscription_plan.title != "Basic":
        response = stripe.Subscription.delete(
            user.userprofile.user_stripe_subscription_id,
        )
        user.userprofile.user_stripe_subscription_id = ""
        user.userprofile.save()
        return response


def createMonthlySubscriptionBasic(user):
    now = datetime.now()
    minutes = now.minute
    hour = now.hour
    day_of_month = now.day
    schedule = CrontabSchedule.objects.get_or_create(
        minute=minutes, hour=hour, day_of_month=day_of_month, month_of_year="*"
    )

    try:
        task = PeriodicTask.objects.get(
            name=f"{user.email} subscription",
        )
        task.crontab = schedule
        task.save()
    except:
        PeriodicTask.objects.create(
            crontab=schedule,
            name=f"{user.email} subscription",
            args=json.dumps([user.id]),
            task="payments.tasks.chargeCustomerEveryMonth",
        )
    user.userprofile.subscription_start_date = now
    user.userprofile.subscription_renew_date = datetime.now() + relativedelta(months=+1)
    user.userprofile.subscription_adds = 1
    user.userprofile.save()
    return True


def createMonthlySubscriptionCharge(user):
    if user.userprofile.subscription_plan.title == "Basic":
        response = createMonthlySubscriptionBasic(user)
    else:
        response = createStripeSubcription(user)
    return response
