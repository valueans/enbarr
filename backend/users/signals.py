from django.db.models.signals import post_save
from django.dispatch import receiver
from .helpers import sendOtpEmail
from .models import User


@receiver(post_save, sender=User)
def user_verification_send_otp(sender, instance, created, **kwargs):
    sendOtpEmail(instance)
