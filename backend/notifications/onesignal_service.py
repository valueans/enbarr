import requests
from django.conf import settings
from .models import Notifications
from django.utils import timezone
from users.models import UserProfile
from django.db.models import Q

url = "https://onesignal.com/api/v1/notifications"

headers = {
    "accept": "application/json",
    "Authorization": f"Basic {settings.ONESIGNAL_RESTAPI_KEY}",
    "content-type": "application/json",
}


def sendAdminNotification(notificationTo, message):
    if notificationTo == "ALL":
        users = UserProfile.objects.filter(receive_notifications=True)
    elif notificationTo == "SUBSCRIBED":
        users = UserProfile.objects.filter(
            subscription_renew_date__gt=timezone.now(), receive_notifications=True
        )
    else:
        users = UserProfile.objects.filter(
            Q(subscription_renew_date__lt=timezone.now())
            | Q(subscription_renew_date=None),
            Q(receive_notifications=True),
        )

    Notifications.objects.bulk_create(
        [Notifications(user=user.user, description=message) for user in users]
    )
    payload = {
        "included_segments": [notificationTo],
        "contents": {"en": message},
        "name": "Notification from Enbarr",
    }
    response = requests.post(url, json=payload, headers=headers)


def sendMessageNotification(notificationTo, message, message_from, channel):
    if notificationTo.userprofile.receive_notifications:
        name = f"You have received a new message from {message_from.email}"
        Notifications.objects.create(
            user=notificationTo,
            description=name,
            user_two=message_from,
            type="MESSAGE",
            channel_id=channel,
        )
        payload = {
            "include_email_tokens": [notificationTo.email],
            "contents": {"en": message},
            "name": name,
        }
        response = requests.post(url, json=payload, headers=headers)
    else:
        pass


def sendLikedHorseNotification(notificationTo, horse, message_from):
    if notificationTo.userprofile.receive_notifications:
        message = f"{message_from.email} has liked {horse.title}"
        Notifications.objects.create(
            user=notificationTo,
            description=message,
            type="HORSE LIKE",
            horse_id=horse.id,
        )
        payload = {"include_email_tokens": [notificationTo.email], "name": message}
        response = requests.post(url, json=payload, headers=headers)
    else:
        pass
