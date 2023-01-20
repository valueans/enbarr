from email.policy import default
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.urls import reverse
from django.utils.translation import ugettext_lazy as _
from datetime import datetime
from django.utils import timezone

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
    email = models.EmailField(unique=True)
    name = models.CharField(_("Name of User"), blank=True, null=True, max_length=255)
    is_verified = models.BooleanField(default=False)
    otp_counter = models.IntegerField(default=0)

    def get_absolute_url(self):
        return reverse("users:detail", kwargs={"username": self.username})

    def __str__(self):
        return f"{self.email}"


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
    phone_number = models.CharField(max_length=15, null=True, blank=True)
    profile_photo = models.ImageField(null=True, blank=True)
    first_name = models.CharField(max_length=50, null=True, blank=True)
    last_name = models.CharField(max_length=50, null=True, blank=True)
    bio = models.TextField(max_length=1500, null=True, blank=True)
    address = models.CharField(max_length=1000, null=True, blank=True)
    city = models.CharField(max_length=100, null=True, blank=True)
    zipcode = models.CharField(max_length=100, null=True, blank=True)
    state = models.CharField(max_length=100, null=True, blank=True)
    country = models.CharField(max_length=100, null=True, blank=True)
    subscription_plan = models.ForeignKey(
        "payments.SubscriptionPlans", on_delete=models.CASCADE, null=True, blank=True
    )
    user_stripe_subscription_id = models.CharField(
        max_length=1000, null=True, blank=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    subscription_start_date = models.DateTimeField(null=True, blank=True)
    subscription_renew_date = models.DateTimeField(null=True, blank=True)
    promotion_adds = models.IntegerField(default=100)
    subscription_adds = models.IntegerField(default=0)

    ban_user_from_posting = models.BooleanField(default=False)
    ban_user_from_posting_date = models.DateField(null=True, blank=True)
    ban_user_from_app = models.BooleanField(default=False)
    ban_user_from_app_date = models.DateField(null=True, blank=True)
    receive_notifications = models.BooleanField(default=True)

    def __str__(self):
        return self.user.email

    class Meta:
        verbose_name_plural = "User Profile"


class UserSearchSave(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    location_id = models.ForeignKey("home.Locations",on_delete=models.CASCADE,null=True,blank=True)
    breed_id = models.ForeignKey("home.Breeds",on_delete=models.CASCADE,null=True,blank=True)
    min_age = models.FloatField(null=True,blank=True)
    max_age = models.FloatField(null=True,blank=True)
    min_height = models.FloatField(null=True,blank=True)
    max_height = models.FloatField(null=True,blank=True)
    min_price = models.FloatField(null=True,blank=True)
    max_price = models.FloatField(null=True,blank=True)
    discipline_id = models.ForeignKey("home.Disciplines",on_delete=models.CASCADE,null=True,blank=True)
    gender = models.CharField(max_length=200,null=True,blank=True)
    color_id = models.ForeignKey("home.Colors",on_delete=models.CASCADE,null=True,blank=True)
    temperament_id = models.ForeignKey("home.Temperaments",on_delete=models.CASCADE,null=True,blank=True)
    keywords = models.ManyToManyField("home.Keywords",related_name="user_search_keywords")


class DeletedUsers(models.Model):
    email = models.EmailField(null=True, blank=True)
