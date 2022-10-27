from payments.models import *
import stripe
from django.conf import settings
from payments.models import StripeSetupIntent

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
    setup_intent_obj = StripeSetupIntent.objects.create(
        setupIntent=response["id"], intent_secret=response["client_secret"]
    )
    stripe_customer.setup_intent.add(setup_intent_obj)
    stripe_customer.save()
    return setup_intent_obj


def getPaymentMethodDetails(method_id):
    # get the payment method details for specific setup intent
    response = stripe.PaymentMethod.retrieve(method_id)
    return response


def charge(plan, user):
    # charge will be made on monthly basis after the promotion periods ends.
    # charge will be made on the existing subscription plan
    customer_id = createStripeCustomer(user)
    response = stripe.PaymentIntent.create(
        customer=customer_id,
        off_session=True,
        confirm=True,
        amount=plan.price,
        currency="usd",
    )
