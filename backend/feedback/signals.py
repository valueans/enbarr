from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail
from django.conf import settings
from .models import FeedBack
from django.contrib.auth import get_user_model

User = get_user_model()

@receiver(post_save, sender=FeedBack)
def send_feedback_response(sender, instance, created, **kwargs):
    if instance.response:
        send_mail(
            f"Feedback Response",
            f"{instance.response}",
            settings.EMAIL_HOST_USER,
            [instance.email],
            fail_silently=False,
        )
    else:
        users = User.objects.filter(is_superuser=True)
        emails = [obj.email for obj in users] 
        send_mail(
            f"Feedback Response",
            f"{instance.message}",
            settings.EMAIL_HOST_USER,
            emails,
            fail_silently=False,
        )
