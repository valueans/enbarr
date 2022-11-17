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


def charge(user):
    # charge will be made on monthly basis after the promotion periods ends.
    # charge will be made on the existing subscription plan
    # charge will be made on the last payment method added.
    plan = user.userprofile.subscription_plan
    customer_id = createStripeCustomer(user)
    try:
        response = stripe.PaymentIntent.create(
            customer=customer_id,
            off_session=True,
            confirm=True,
            amount=int(plan.price)
            * 100,  # stripe will charge in cents so e.g 10USD = 1000cents
            currency="usd",
        )
        return response, None
    except stripe.error.CardError as e:
        err = e.error
        # Error code will be authentication_required if authentication is needed
        print("Code is: %s" % err.code)
        return None, err


def createMonthlySubscriptionCharge(user):
    response, error = charge(user)
    if error is None:
        now = datetime.now()
        minutes = now.minute
        hour = now.hour
        day_of_month = now.day
        try:
            schedule = CrontabSchedule.objects.get(
                minute=minutes, hour=hour, day_of_month=day_of_month, month_of_year="*"
            )
        except:
            schedule = CrontabSchedule.objects.create(
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
        user.userprofile.subscription_renew_date = datetime.now() + relativedelta(
            months=+1
        )
        if user.userprofile.subscription_plan.title == "Basic":
            user.userprofile.promotion_adds = 1
        elif user.userprofile.subscription_plan.title == "Premium":
            user.userprofile.promotion_adds = 10
        elif user.userprofile.subscription_plan.title == "Platinum":
            user.userprofile.promotion_adds = 1000000000
        user.userprofile.save()
        return True
    else:
        print(error)
        return error.code
