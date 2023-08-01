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
    last_message = MessagesSerializer(read_only=True)
    is_deleted = serializers.SerializerMethodField("get_is_deleted", read_only=True)
    user_one_block = serializers.SerializerMethodField(read_only=True)
    user_two_block = serializers.SerializerMethodField(read_only=True)

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
            "is_deleted",
            "user_one_block",
            "user_two_block",
        )

    def get_user_one_profile(self, obj):
        current_user = self.context["request"].user
        if current_user.id == obj.user_one.id:
            profile = UserProfile.objects.get(user=obj.user_one)
        else:
            profile = UserProfile.objects.get(user=obj.user_two)
        serializer = UserProfileSerializer(profile)
        return serializer.data

    def get_user_two_profile(self, obj):
        current_user = self.context["request"].user
        if current_user.id != obj.user_one.id:
            profile = UserProfile.objects.get(user=obj.user_one)
        else:
            profile = UserProfile.objects.get(user=obj.user_two)
        serializer = UserProfileSerializer(profile)
        return serializer.data

    def get_is_deleted(self, obj):
        current_user = self.context["request"].user
        if current_user.id == obj.user_one.id and obj.user_one_deleted:
            return True
        elif current_user.id == obj.user_two.id and obj.user_two_deleted:
            return True
        else:
            return False
        
    def get_user_one_block(self, obj):
        current_user = self.context["request"].user
        if current_user.id == obj.user_one.id:
            return obj.blocked_user_one
        else:
            return obj.blocked_user_two

    def get_user_two_block(self, obj):
        current_user = self.context["request"].user
        if current_user.id != obj.user_one.id:
            return obj.blocked_user_one
        else:
            return obj.blocked_user_two