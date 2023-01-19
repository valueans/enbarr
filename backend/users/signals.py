from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .helpers import sendOtpEmail, subscribeUserToFreeSubscription
from .models import User, UserProfile, DeletedUsers
from payments.api.v1.helpers import createStripeCustomer


@receiver(post_save, sender=User)
def user_verification_send_otp(sender, instance, created, **kwargs):
    print("this is working")
    """
    sendOTP verification on signup.
    and create userprofile and assign promotion adds if the user is register 1st time
    first it will check if the user was registered before and deleted the account then this account will not get promotion adds.
    if the user is register 1st time then he will get 100 promotion adds.
    """
    delete_user = DeletedUsers.objects.filter(email=instance.email).count()
    if delete_user > 0:
        UserProfile.objects.get_or_create(user=instance, promotion_adds=0)
    else:
        try:
            UserProfile.objects.get(user=instance)
        except:
            UserProfile.objects.create(user=instance, promotion_adds=100)
    if created:
        sendOtpEmail(instance)
        createStripeCustomer(instance)
        subscribeUserToFreeSubscription(instance)


@receiver(post_delete, sender=UserProfile)
def user_delete(sender, instance, **kwargs):
    user = instance.user
    user.delete()
