from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authentication import TokenAuthentication
from django.conf import settings
from drf_yasg.utils import swagger_auto_schema
from home.api.v1.viewsets import deleted_message
from payments.models import SubscriptionPlans, StripeCustomer, Cards
import stripe
from django.http import HttpResponse
from django.db.models import Q
from .helpers import *
from .serializers import (
    CardsSerializer,
    SubscriptionPlansSerializer,
    CardsSerializer,
)
from users.api.serializers import UserProfileSerializer
from home.api.v1.swaggerParams import (
    customDeleteResponse,
    customSetupIntentResponse,
    createParam,
    customUpgradeSubscriptionResponse,
)
from rest_framework.decorators import (
    api_view,
    permission_classes,
    authentication_classes,
)

stripe.api_key = settings.STRIPE_SECRET_KEY


@swagger_auto_schema(
    method="get", responses={200: SubscriptionPlansSerializer(many=True)}
)
@swagger_auto_schema(method="post", request_body=SubscriptionPlansSerializer)
@swagger_auto_schema(method="put", responses={200: SubscriptionPlansSerializer})
@swagger_auto_schema(method="delete", responses=customDeleteResponse())
@api_view(["GET", "POST", "PUT", "DELETE"])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def plansView(request):
    if request.method == "GET":
        instance = SubscriptionPlans.objects.all().order_by("id")
        serializer = SubscriptionPlansSerializer(instance, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
    if request.method == "POST":
        serializer = SubscriptionPlansSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == "PUT":
        plan_id = request.GET.get("plan-id", None)
        if plan_id is None:
            data = {"status": "error", "message": "plan-id is required"}
            return Response(data=data, status=status.HTTP_404_NOT_FOUND)
        try:
            instance = SubscriptionPlans.objects.get(id=plan_id)
        except:
            data = {"status": "error", "message": "Invalid plan-id"}
            return Response(data=data, status=status.HTTP_404_NOT_FOUND)

        serializer = SubscriptionPlansSerializer(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == "DELETE":
        plan_id = request.GET.get("plan-id", None)
        if plan_id is None:
            data = {"status": "error", "message": "plan-id is required"}
            return Response(data=data, status=status.HTTP_404_NOT_FOUND)
        try:
            instance = SubscriptionPlans.objects.get(id=plan_id)
        except:
            data = {"status": "error", "message": "Invalid plan-id"}
            return Response(data=data, status=status.HTTP_404_NOT_FOUND)
        instance.delete()
        data = {"status": "ok", "message": deleted_message}
        return Response(data=data, status=status.HTTP_200_OK)


@swagger_auto_schema(method="get", responses=customSetupIntentResponse())
@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def setupIntentStripeView(request):
    """
    when ever user need to add a new card you want to create a new setup intent.
    each setup intent will represent new payment method
    """
    if request.method == "GET":
        user = request.user
        stipe_customer = StripeCustomer.objects.get(user=user)
        setup_intent = createSetupIntentCustomer(user)
        data = {
            "status": "OK",
            "setupIntent": setup_intent.intent_secret,
            "ephemeralKey": setup_intent.ephemeral_key,
            "customer": stipe_customer.stipe_customerId,
            "publish_key": settings.STRIPE_PUBLISHABLE_KEY,
        }
        return Response(data=data, status=status.HTTP_200_OK)


@swagger_auto_schema(method="get", responses={200: CardsSerializer(many=True)})
@swagger_auto_schema(
    method="delete",
    manual_parameters=[
        createParam(paramName="card-id", description="to delete a specific card")
    ],
    responses=customDeleteResponse(),
)
@api_view(["GET", "DELETE"])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def paymentMethods(request):
    """you can use this api to get all card details for specific user"""
    if request.method == "GET":
        user = request.user
        instances = Cards.objects.filter(user=user, active=True).order_by("id").last()
        serializer = CardsSerializer(instances)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
    if request.method == "DELETE":
        card_id = request.GET.get("card-id", None)
        if card_id is None:
            data = {"status": "ERROR", "message": "card-id is required"}
            return Response(data=data, status=status.HTTP_404_NOT_FOUND)

        try:
            card = Cards.objects.get(id=card_id)
        except:
            data = {"status": "ERROR", "message": "Invalid card-id"}
            return Response(data=data, status=status.HTTP_404_NOT_FOUND)

        payment_method_id = card.payment_id

        stripe.PaymentMethod.detach(payment_method_id)

        data = {"status": "OK", "message": deleted_message}
        return Response(data=data, status=status.HTTP_200_OK)


@swagger_auto_schema(
    method="POST",
    manual_parameters=[
        createParam(
            paramName="plan-id",
            description="to get the plan that needs to be upgrade or subscribed",
            required=True,
        )
    ],
    responses=customUpgradeSubscriptionResponse(),
)
@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def upgradeSubscriptionView(request):
    if request.method == "POST":
        user = request.user
        upgrade_plan_id = request.POST.get("plan-id", None)
        if upgrade_plan_id is None:
            data = {
                "status": "error",
                "message": "plan-id is required",
            }
            return Response(data=data, status=status.HTTP_400_BAD_REQUEST)

        plan = SubscriptionPlans.objects.get(id=upgrade_plan_id)
        cards = Cards.objects.filter(user=user, active=True)
        if cards.count() == 0 and plan.title != "Basic":
            data = {
                "status": "ERROR",
                "message": "Please add a payment method before upgrade to subscription",
            }
            return Response(data=data, status=status.HTTP_400_BAD_REQUEST)

        response = createMonthlySubscriptionCharge(user, plan)
        serializer = UserProfileSerializer(user.userprofile)
        data = {
            "status": "OK",
            "message": "Subscription updated",
            "data": serializer.data,
        }
        return Response(data=data, status=status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes([AllowAny])
def stripe_webhook(request):
    """_stripe webhook when the user will create the setup intent and add a card on setup intent on stripe page.it will send the response for that setup intent for verification_
    Returns:
        200
    """
    if request.method == "POST":
        webhook_secret = settings.STRIPE_WEBHOOK_SECRET
        payload = request.body
        signature = request.headers.get("stripe-signature")
        event = None

        try:
            event = stripe.Webhook.construct_event(
                payload=payload, sig_header=signature, secret=webhook_secret
            )
        except ValueError as e:
            # Invalid payload
            return HttpResponse(status=400)

        if event.type == "setup_intent.succeeded":
            setup_intent = event.data.object
            instance = StripeSetupIntent.objects.get(
                setupIntent=setup_intent["id"],
                intent_secret=setup_intent["client_secret"],
            )
            instance.payment_method_id = setup_intent["payment_method"]
            instance.status = True
            instance.save()
            response = getPaymentMethodDetails(setup_intent["payment_method"])
            stripe_customer = StripeCustomer.objects.get(
                stipe_customerId=setup_intent["customer"]
            )
            card = Cards.objects.create(
                user=stripe_customer.user,
                last_4=response["card"]["last4"],
                exp_month=response["card"]["exp_month"],
                exp_year=response["card"]["exp_year"],
                payment_id=instance.payment_method_id,
                active=True,
            )
            subscription_id = (
                stripe_customer.user.userprofile.user_stripe_subscription_id
            )
            if subscription_id:
                stripe.Subscription.modify(
                    subscription_id, default_payment_method=card.payment_id
                )
            prev_card = Cards.objects.filter(
                Q(user=stripe_customer.user), ~Q(id=card.id), Q(active=True)
            )
            prev_card.update(active=False)
            return HttpResponse(status=200)
        elif event.type == "setup_intent.created":
            return HttpResponse(status=200)
        elif event.type == "payment_intent.created":
            return HttpResponse(status=200)
        elif event.type == "payment_intent.succeeded":
            return HttpResponse(status=200)
        elif event.type == "customer.deleted":
            return HttpResponse(status=200)
        elif event.type == "customer.subscription.created":
            return HttpResponse(status=200)
        elif event.type == "charge.succeeded":
            try:
                response = event.data.object
                invoice_id = response["invoice"]
                payment, created = PaymentsHistory.objects.get_or_create(
                    stripe_invoice_id=invoice_id
                )
                card = Cards.objects.get(payment_id=response["payment_method"])
                payment.card = card
                payment.user = card.user
                payment.stripe_receipt_link = response["receipt_url"]
                payment.amount = float(response["amount"]) / 100
                payment.payment_intent_id = response["payment_intent"]
                if response["status"] == "succeeded":
                    payment.status = True
                else:
                    payment.status = False
                payment.save()
                if card.user.userprofile.subscription_plan.title == "Premium":
                    card.user.userprofile.subscription_adds = 10
                elif card.user.userprofile.subscription_plan == "Platinum":
                    card.user.userprofile.subscription_adds = 10000000
                card.user.userprofile.save()
                return HttpResponse(status=200)
            except:
                return HttpResponse(status=400)
        elif event.type == "invoice.created":
            return HttpResponse(status=200)
        elif event.type == "invoice.paid":
            return HttpResponse(status=200)
        elif event.type == "invoice.paid":
            return HttpResponse(status=200)
        elif event.type == "invoice.payment_failed":
            try:
                response = event.data.object
                stripe_customer = StripeCustomer.objects.get(
                    stipe_customerId=response["customer"]
                )
                card = (
                    Cards.objects.filter(user=stripe_customer.user, active=True)
                    .order_by("id")
                    .last()
                )
                card.message = (
                    "Unable to charge your card please update your payment method."
                )
                card.user.userprofile.subscription_adds = 0
                card.user.userprofile.save()
                card.save()
                return HttpResponse(status=200)
            except:
                return HttpResponse(status=400)
        else:
            print("Unhandled event type {}".format(event.type))

        return HttpResponse(status=200)
