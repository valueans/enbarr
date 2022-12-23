from notifications.models import Notifications
from rest_framework import serializers
from users.api.serializers import UserSerializer, UserProfileSerializer


class NotificationsSerializer(serializers.ModelSerializer):
    user_profile = serializers.SerializerMethodField("get_user_profile", read_only=True)

    class Meta:
        model = Notifications
        fields = (
            "id",
            "description",
            "read_status",
            "user_profile",
        )
        read_only_fields = ["id"]

    def get_user_profile(self, obj):
        instance = obj.user.userprofile
        serializer = UserProfileSerializer(instance)
        return serializer.data
