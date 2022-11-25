from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import PushNotificationsAdmin
from django_celery_beat.models import PeriodicTask
import json


@receiver(post_save, sender=PushNotificationsAdmin)
def set_push_notifications(sender, instance, created, **kwargs):
    schedule = instance.run_at
    print(created)
    if created == True:

        PeriodicTask.objects.create(
            crontab=schedule,
            name=instance.name,
            args=json.dumps([instance.name, instance.send_to]),
            task="notifications.tasks.sendPushNotification",
        )
    else:
        task = PeriodicTask.objects.get(
            crontab=schedule,
            name=instance.name,
            task="notifications.tasks.sendPushNotification",
        )
        task.enabled = instance.active
        task.save()


@receiver(post_delete, sender=PushNotificationsAdmin)
def delete_push_notifications(sender, instance, **kwargs):
    schedule = instance.run_at
    try:
        task = PeriodicTask.objects.get(
            crontab=schedule,
            name=instance.name,
            task="notifications.tasks.sendPushNotification",
        )
        task.delete()
    except:
        pass
