from django.db import models
from django.contrib.auth import get_user_model
from django_celery_beat.models import CrontabSchedule

User = get_user_model()

SEND_PUSH_NOTIFICATION_USER_GROUP = (
    ("ALL", "ALL"),
    ("SUBSCRIBED", "SUBSCRIBED"),
    ("UN-SUBSCRIBED", "UN-SUBSCRIBED"),
)

NOTIFICATION_TYPE = (
    ("MESSAGE","MESSAGE"),
    ("HORSE LIKE","HORSE LIKE"),
    ("HORSE REPORT","HORSE REPORT"),
    ("HORSE REVIEW","HORSE REVIEW"),
)

class Notifications(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    description = models.TextField(max_length=1000, null=True, blank=True)
    message_profile_url = models.TextField(null=True, blank=True)
    type = models.CharField(max_length=100,choices=NOTIFICATION_TYPE,default="MESSAGE")
    read_status = models.BooleanField(default=False)

    def __str__(self):
        return f"user:{self.user.email} status:{self.read_status}"


class PushNotificationsAdmin(models.Model):
    name = models.CharField(max_length=1000, null=True, blank=True)
    run_at = models.ForeignKey(
        CrontabSchedule, on_delete=models.CASCADE, null=True, blank=True
    )
    send_to = models.CharField(
        choices=SEND_PUSH_NOTIFICATION_USER_GROUP, max_length=20, null=True, blank=True
    )
    active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.name}"

    class Meta:
        verbose_name_plural = "Push Notifications"
