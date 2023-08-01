from rest_framework import serializers
from users.models import *
from django.http import HttpRequest
from allauth.utils import email_address_exists, generate_unique_username
from allauth.account import app_settings as allauth_settings
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from allauth.account.forms import ResetPasswordForm
from rest_auth.serializers import PasswordResetSerializer
from payments.api.v1.serializers import SubscriptionPlansSerializer
from payments.models import SubscriptionPlans
from django.utils.translation import ugettext_lazy as _


class SignupSerializer(serializers.ModelSerializer):
    user_type = serializers.CharField(max_length=100,write_only=True,required=False)
    
    class Meta:
        model = User
        fields = ("id", "name", "email", "password", "userprofile","user_type")
        extra_kwargs = {
            "password": {"write_only": True, "style": {"input_type": "password"}},
            "email": {
                "required": True,
                "allow_blank": False,
            },
            "userprofile": {"read_only": True},
            "user_type": {
                "required": False,
                "allow_blank": False,
            },
        }

    def _get_request(self):
        request = self.context.get("request")
        if (
            request
            and not isinstance(request, HttpRequest)
            and hasattr(request, "_request")
        ):
            request = request._request
        return request

    def validate_email(self, email):
        email = get_adapter().clean_email(email)
        if allauth_settings.UNIQUE_EMAIL:
            if email and email_address_exists(email):
                raise serializers.ValidationError(
                    _("A user is already registered with this e-mail address.")
                )
        return email

    def create(self, validated_data):
        user_type = validated_data.pop("user_type", "USER")
        user = User(
            email=validated_data.get("email"),
            name=validated_data.get("name"),
            username=generate_unique_username(
                [validated_data.get("name"), validated_data.get("email"), "user"]
            ),
        )
        if user_type == "ADMIN":
            user.is_staff = True
            user.is_superuser = True
        user.set_password(validated_data.get("password"))
        user.save()
        request = self._get_request()
        setup_user_email(request, user, [])
        return user

    def save(self, request=None):
        """rest_auth passes request so we must override to accept it"""
        return super().save()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "name", "is_verified", "userprofile","username"]


class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    email = serializers.EmailField(write_only=True, required=False)
    user_subscription = serializers.SerializerMethodField(
        "get_user_subscription", read_only=True
    )

    class Meta:
        model = UserProfile
        fields = "__all__"
        read_only_fields = ["id"]

    def validate_email(self, email):
        user = User.objects.filter(email=email)
        if user.count() > 0:
            raise serializers.ValidationError("Email Already Exist")
        return email

    def update(self, instance, validated_data):
        obj = super().update(instance, validated_data)
        try:
            subscription_plan = validated_data.pop("subscription_plan")
            if instance.subscription_plan == None:
                instance.subscription_date = datetime.now()
            instance.subscription_plan = subscription_plan
        except:
            pass

        try:
            email = validated_data.pop("email", None)
            if email:
                if obj.user.email != email:
                    obj.user.email = email
                    obj.user.is_verified = False
                    obj.user.save()
        except:
            pass
        instance.save()
        return obj

    def get_user_subscription(self, obj):
        try:
            instance = SubscriptionPlans.objects.get(id=obj.subscription_plan.id)
            serializer = SubscriptionPlansSerializer(instance)
            return serializer.data
        except:
            return None


class PasswordSerializer(PasswordResetSerializer):
    """Custom serializer for rest_auth to solve reset password error"""

    password_reset_form_class = ResetPasswordForm
