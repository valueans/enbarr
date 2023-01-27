from rest_framework import serializers
from chat.models import Messages, Conversation
from users.models import UserProfile
from users.api.serializers import UserProfileSerializer


class MessagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Messages
        fields = "__all__"


class ConversationSerializer(serializers.ModelSerializer):
    user_one_profile = serializers.SerializerMethodField(read_only=True)
    user_two_profile = serializers.SerializerMethodField(read_only=True)
    last_message = serializers.SerializerMethodField("get_last_message",read_only=True)

    class Meta:
        model = Conversation
        fields = (
            "id",
            "user_one_profile",
            "user_two_profile",
            "channel",
            "last_message",
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

    def get_last_message(self,obj):
        message = obj.message.all().order_by('id').reverse().first()
        serializer = MessagesSerializer(message)
        return serializer.data
