from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.conf import settings
from drf_yasg.utils import swagger_auto_schema
from .serializers import (
    CardsSerializer,
    StripeCustomerSerializer,
    SubscriptionPlansSerializer,
    CardsSerializer,
)
from home.api.v1.swaggerParams import (
    customDeleteResponse,
    customSetupIntentResponse,
    createParam,
)
from home.api.v1.viewsets import deleted_message
from payments.models import SubscriptionPlans, StripeCustomer, Cards
import stripe
from django.http import HttpResponse
from .helpers import *

stripe.api_key = settings.STRIPE_SECRET_KEY


from rest_framework.decorators import (
    api_view,
    permission_classes,
    authentication_classes,
)


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
        instance = SubscriptionPlans.objects.all()
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


@swagger_auto_schema(method="get", responses={200: StripeCustomerSerializer()})
@swagger_auto_schema(method="POST", responses=customSetupIntentResponse())
@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def setupIntentStripeView(request):
    """
    when ever user need to add a new card you want to create a new setup intent.
    each setup intent will represent new payment method
    """
    if request.method == "GET":
        user = request.user
        insatnce = StripeCustomer.objects.get(user=user)
        serializer = StripeCustomerSerializer(insatnce)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
    if request.method == "POST":
        user = request.user
        setup_intent = createSetupIntentCustomer(user)
        data = {
            "status": "OK",
            "setup-intent-id": setup_intent.setupIntent,
            "setup-intent-secret": setup_intent.intent_secret,
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
        instances = Cards.objects.filter(user=user)
        serializer = CardsSerializer(instances, many=True)
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

        response = stripe.PaymentMethod.detach(payment_method_id)

        data = {"status": "OK", "message": deleted_message}
        return Response(data=data, status=status.HTTP_200_OK)


@api_view(["POST"])
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
            Cards.objects.create(
                user=stripe_customer.user,
                last_4=response["last_4"],
                exp_month=response["exp_month"],
                exp_year=response["exp_year"],
                payment_id=instance.payment_method_id,
            )
        else:
            print("Unhandled event type {}".format(event.type))

        return HttpResponse(status=200)
