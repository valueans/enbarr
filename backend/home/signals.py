from django.contrib.auth import get_user_model
from users.models import Notifications
from .models import Report, Messages, Horses
from django.db.models.signals import post_save
from django.dispatch import receiver

User = get_user_model()


@receiver(post_save, sender=Report)
def create_notification_report(sender, instance, created, **kwargs):
    user = User.objects.filter(is_superuser=True).first()
    description = f"{instance.user.email} has reported horse {instance.horse.title} with id {instance.horse.id} as {instance.reason}"
    Notifications.objects.create(user=user, description=description)


@receiver(post_save, sender=Messages)
def create_notification_message(sender, instance, created, **kwargs):
    user = instance.receiver
    description = f"{instance.sender.email} has messaged you"
    Notifications.objects.create(user=user, description=description)


@receiver(post_save, sender=Horses)
def create_notification_horse_approval(sender, instance, created, **kwargs):
    user = User.objects.filter(is_superuser=True).first()
    description = f"{instance.uploaded_by.email} has posted a add for review"
    Notifications.objects.create(user=user, description=description)
