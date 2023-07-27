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

    user_ids = []
    for user in users:
        if user.one_signal_play_id:
            user_ids.append(user.one_signal_play_id)
    Notifications.objects.bulk_create(
        [
            Notifications(user=user.user, description=message, type="ADMIN")
            for user in users
        ]
    )
    payload = {
        "include_player_ids": user_ids,
        "contents": {"en": message},
        "name": "Notification from Enbarr",
        "app_id": settings.ONESIGNAL_APPID,
    }
    response = requests.post(url, json=payload, headers=headers)
    return response


def sendMessageNotification(notificationTo, message, message_from, channel):
    if notificationTo.userprofile.receive_notifications:
        name = f"You have received a new message from {message_from.userprofile.first_name} {message_from.userprofile.last_name}"
        Notifications.objects.create(
            user=notificationTo,
            description=name,
            user_two=message_from,
            type="MESSAGE",
            channel_id=channel,
        )
        payload = {
            "include_email_tokens": [notificationTo.email],
            "include_player_ids": [notificationTo.userprofile.one_signal_play_id],
            "contents": {"en": message},
            "name": name,
            "app_id": settings.ONESIGNAL_APPID,
        }
        response = requests.post(url, json=payload, headers=headers)
    else:
        pass


def sendLikedHorseNotification(notificationTo, horse, message_from):
    if notificationTo.userprofile.receive_notifications:
        message = f"{message_from.userprofile.first_name} {message_from.userprofile.last_name} has liked {horse.title}"
        Notifications.objects.create(
            user=notificationTo,
            description=message,
            type="HORSE LIKE",
            horse_id=horse.id,
        )
        payload = {
            "include_email_tokens": [notificationTo.email],
            "include_player_ids": [notificationTo.userprofile.one_signal_play_id],
            "name": message,
            "app_id": settings.ONESIGNAL_APPID,
        }
        response = requests.post(url, json=payload, headers=headers)
    else:
        pass
