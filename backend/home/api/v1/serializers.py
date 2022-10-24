from django.contrib.auth import get_user_model
from django.http import HttpRequest
from django.utils.translation import ugettext_lazy as _
from allauth.account import app_settings as allauth_settings
from allauth.account.forms import ResetPasswordForm
from allauth.utils import email_address_exists, generate_unique_username
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from pyparsing import Keyword
from rest_framework import serializers
from rest_auth.serializers import PasswordResetSerializer
from users.models import SubscriptionPlans, UserProfile, Notifications, UserSearchSave
from home.models import (
    ContactUs,
    HorseImages,
    Keywords,
    Horses,
    Favourite,
    Likes,
    DisLikes,
    Messages,
    Conversation,
    Report,
    FeedBack,
)


User = get_user_model()


class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "name", "email", "password")
        extra_kwargs = {
            "password": {"write_only": True, "style": {"input_type": "password"}},
            "email": {
                "required": True,
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
        user = User(
            email=validated_data.get("email"),
            name=validated_data.get("name"),
            username=generate_unique_username(
                [validated_data.get("name"), validated_data.get("email"), "user"]
            ),
        )
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
        fields = ["id", "email", "name", "is_verified"]


class PasswordSerializer(PasswordResetSerializer):
    """Custom serializer for rest_auth to solve reset password error"""

    password_reset_form_class = ResetPasswordForm


class SubscriptionPlansSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubscriptionPlans
        fields = "__all__"
        read_only_fields = ["id"]


class UserProfileSerializer(serializers.ModelSerializer):
    plan = SubscriptionPlansSerializer(read_only=True)
    plan_id = serializers.IntegerField(write_only=True, required=False)

    class Meta:
        model = UserProfile
        fields = "__all__"
        read_only_fields = ["id"]

    def create(self, validated_data):
        try:
            plan_id = validated_data.pop("plan_id")
            plan_instance = SubscriptionPlans.objects.get(id=plan_id)
            instance = UserProfile.objects.create(plan=plan_instance, **validated_data)
        except:
            instance = UserProfile.objects.create(**validated_data)
        return instance


class ContactUsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactUs
        fields = "__all__"
        read_only_fields = ["id"]


class HorseImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = HorseImages
        fields = "__all__"
        read_only_fields = ["id"]


class KeywordsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Keywords
        fields = "__all__"
        read_only_fields = ["id"]


class HorsesSerializer(serializers.ModelSerializer):
    images = HorseImagesSerializer(read_only=True, many=True)
    keywords = KeywordsSerializer(read_only=True, many=True)
    images_id = serializers.ListField(write_only=True, required=False)
    keywords_id = serializers.ListField(write_only=True, required=False)
    likes = serializers.SerializerMethodField(read_only=True)
    dislikes = serializers.SerializerMethodField(read_only=True)
    isliked = serializers.SerializerMethodField(read_only=True)
    isdisliked = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Horses
        fields = "__all__"
        extra_kwargs = {"uploaded_by": {"required": False}}
        read_only_fields = ["id"]

    def create(self, validated_data):
        images_id = validated_data.pop("images_id")
        keywords_id = validated_data.pop("keywords_id")

        instance = Horses.objects.create(**validated_data)

        for id in images_id:
            image_instance = HorseImages.objects.get(id=id)
            instance.images.add(image_instance)

        for id in keywords_id:
            keyword_instance = Keywords.objects.get(id=id)
            instance.keywords.add(keyword_instance)

        instance.save()
        return instance

    def update(self, instance, validated_data):
        for key, value in validated_data.items():
            if key == "images_id":
                for id in value:
                    obj = HorseImages.objects.get(id=id)
                    instance.images.add(obj)
            elif key == "keywords_id":
                instance.keywords.clear()
                for id in value:
                    obj = Keywords.objects.get(id=id)
                    instance.keywords.add(obj)
            else:
                setattr(instance, key, value)
        instance.save()
        return instance

    def get_likes(self, obj):
        return obj.likes.all().count()

    def get_dislikes(self, obj):
        return obj.dislikes.all().count()

    def get_isliked(self, obj):
        user = self.context["request"].user
        try:
            obj.likes.get(user=user)
        except:
            return False
        return True

    def get_isdisliked(self, obj):
        user = self.context["request"].user
        try:
            obj.dislikes.get(user=user)
        except:
            return False
        return True


class FavouriteSerializer(serializers.ModelSerializer):
    horses = HorsesSerializer(read_only=True)
    horse_id = serializers.IntegerField(write_only=True, required=True)

    class Meta:
        model = Favourite
        fields = "__all__"
        read_only_fields = ["id"]

    def create(self, validated_data):
        id = validated_data.pop("horse_id")

        user = self.context["request"].user
        horseInstance = Horses.objects.get(id=id)
        try:
            Favourite.objects.get(user=user, horses=horseInstance)
        except:
            instance = Favourite.objects.create(horses=horseInstance, **validated_data)
            return instance
        raise serializers.ValidationError({"status": "OK", "message": "Already Liked"})


class NotificationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notifications
        fields = "__all__"
        read_only_fields = ["id"]


class UserSearchSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSearchSave
        fields = "__all__"
        read_only_fields = ["id"]


class LikesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Likes
        fields = "__all__"


class DislikesSerializer(serializers.ModelSerializer):
    class Meta:
        model = DisLikes
        fields = "__all__"


class MessagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Messages
        fields = "__all__"


class ConversationSerializer(serializers.ModelSerializer):
    user_one_profile = serializers.SerializerMethodField(read_only=True)
    user_two_profile = serializers.SerializerMethodField(read_only=True)
    message = MessagesSerializer(read_only=True, many=True)

    class Meta:
        model = Conversation
        fields = (
            "id",
            "user_one_profile",
            "user_two_profile",
            "message",
            "created_at",
            "updated_at",
        )

    def get_user_one_profile(self, obj):
        profile = UserProfile.objects.get(user=obj.user_one)
        serializer = UserProfileSerializer(profile)
        return serializer.data

    def get_user_two_profile(self, obj):
        profile = UserProfile.objects.get(user=obj.user_two)
        serializer = UserProfileSerializer(profile)
        return serializer.data


class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = "__all__"


class FeedBackSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeedBack
        fields = "__all__"
