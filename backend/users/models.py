from email.policy import default
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.urls import reverse
from django.utils.translation import ugettext_lazy as _

SUBSCRIPTION_PLAN = (
    ("Basic", "Basic"),
    ("Premium", "Premium"),
    ("Platinum", "Platinum"),
)


class User(AbstractUser):
    # WARNING!
    """
    Some officially supported features of Crowdbotics Dashboard depend on the initial
    state of this User model (Such as the creation of superusers using the CLI
    or password reset in the dashboard). Changing, extending, or modifying this model
    may lead to unexpected bugs and or behaviors in the automated flows provided
    by Crowdbotics. Change it at your own risk.


    This model represents the User instance of the system, login system and
    everything that relates with an `User` is represented by this model.
    """

    # First Name and Last Name do not cover name patterns
    # around the globe.
    name = models.CharField(_("Name of User"), blank=True, null=True, max_length=255)
    is_verified = models.BooleanField(default=False)
    otp_counter = models.IntegerField(default=0)

    def get_absolute_url(self):
        return reverse("users:detail", kwargs={"username": self.username})


class SubscriptionPlans(models.Model):
    price = models.FloatField(null=True, blank=True)
    description = models.CharField(
        choices=SUBSCRIPTION_PLAN, max_length=100, null=True, blank=True
    )


class UserProfile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    phone_number = models.CharField(max_length=15, null=True, blank=True)
    profile_photo = models.ImageField(null=True, blank=True)
    bio = models.TextField(max_length=1500, null=True, blank=True)
    address = models.CharField(max_length=1000, null=True, blank=True)
    city = models.CharField(max_length=100, null=True, blank=True)
    zipcode = models.CharField(max_length=100, null=True, blank=True)
    state = models.CharField(max_length=100, null=True, blank=True)
    country = models.CharField(max_length=100, null=True, blank=True)
    subscription_plan = models.ForeignKey(
        SubscriptionPlans, on_delete=models.CASCADE, null=True, blank=True
    )
    subscription_date = models.DateTimeField(null=True, blank=True)
    promotion_adds = models.IntegerField(default=100)

    def __str__(self):
        return self.user.email


class Notifications(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    description = models.TextField(max_length=1000, null=True, blank=True)
    read_status = models.BooleanField(default=False)

    def __str__(self):
        return f"user:{self.user.email} status:{self.read_status}"


class UserSearchSave(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    title = models.CharField(max_length=100, null=True, blank=True)


class DeletedUsers(models.Model):
    email = models.EmailField(null=True, blank=True)
