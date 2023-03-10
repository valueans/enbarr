from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Messages(models.Model):
    Messages = models.TextField(max_length=2000, null=True, blank=True)
    channel = models.CharField(max_length=100, null=True, blank=True)
    timetoken = models.CharField(max_length=100, null=True, blank=True)
    sender = models.CharField(max_length=100, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)


class Conversation(models.Model):
    user_one = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, blank=True, related_name="userone"
    )
    user_two = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, blank=True, related_name="usertwo"
    )
    last_message = models.ForeignKey(
        Messages,
        related_name="messages",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )
    channel = models.CharField(max_length=100, null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user_one_deleted = models.BooleanField(default=False)
    user_two_deleted = models.BooleanField(default=False)


class DeletedConversationsId(models.Model):
    channel = models.CharField(max_length=100, null=False, blank=False)
    user_one = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="deleted_Conversation_userone",
    )
    user_two = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="deleted_Conversation_usertwo",
    )
