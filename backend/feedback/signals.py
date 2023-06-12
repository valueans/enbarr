from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail
from django.conf import settings
from .models import FeedBack


@receiver(post_save, sender=FeedBack)
def send_feedback_response(sender, instance, created, **kwargs):
    if instance.response:
        send_mail(
            f"Feedback Response",
            f"{instance.response}",
            settings.SENDGRID_EMAIL,
            [instance.email],
            fail_silently=False,
        )
