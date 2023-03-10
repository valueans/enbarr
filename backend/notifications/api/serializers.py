from notifications.models import Notifications
from rest_framework import serializers
from users.api.serializers import UserSerializer, UserProfileSerializer
from chat.models import Conversation


class NotificationsSerializer(serializers.ModelSerializer):
    user_profile = serializers.SerializerMethodField(read_only=True)
    user_two_profile = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Notifications
        fields = (
            "id",
            "description",
            "read_status",
            "user_profile",
            "user_two_profile",
            "type",
            "channel_id",
            "horse_id",
        )
        read_only_fields = ["id"]

    def get_user_profile(self, obj):
        instance = obj.user.userprofile
        serializer = UserProfileSerializer(instance)
        return serializer.data

    def get_user_two_profile(self, obj):
        try:
            instance = obj.user_two.userprofile
            serializer = UserProfileSerializer(instance)
            return serializer.data
        except:
            return None
