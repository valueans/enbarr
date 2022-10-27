from payments.models import SubscriptionPlans, StripeCustomer, StripeSetupIntent, Cards
from rest_framework import serializers


class SubscriptionPlansSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubscriptionPlans
        fields = "__all__"
        read_only_fields = ["id"]


class CardsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cards
        fields = "__all__"
        read_only_fields = ["id"]


class StripeSetupIntentSerializer(serializers.ModelSerializer):
    class Meta:
        model = StripeSetupIntent
        fields = "__all__"
        read_only_fields = ["id"]


class StripeCustomerSerializer(serializers.ModelSerializer):
    setup_intent = StripeSetupIntentSerializer(many=True)

    class Meta:
        model = StripeCustomer
        fields = "__all__"
        read_only_fields = ["id"]
