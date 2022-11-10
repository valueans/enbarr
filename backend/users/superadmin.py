from django.contrib import admin
from .models import *
from home.models import *
from feedback.models import *
from notifications.models import *
from payments.models import *
from allauth.account.models import EmailAddress
from rest_framework.authtoken.models import TokenProxy
from allauth.socialaccount.models import SocialToken, SocialAccount, SocialApp
from django_celery_beat.models import ClockedSchedule, SolarSchedule, IntervalSchedule
from django.contrib.sites.models import Site


class SuperAdminSite(admin.AdminSite):
    site_header = "Super Admin Enbarr"
    site_title = "Super Admin Enbarr Portal"
    index_title = "Welcome to Enbarr"


super_admin_site = SuperAdminSite(name="super_admin")

# user models
super_admin_site.register(User)
super_admin_site.register(UserProfile)
super_admin_site.register(UserSearchSave)
super_admin_site.register(DeletedUsers)

# home models
super_admin_site.register(ContactUs)
super_admin_site.register(HorseImages)
super_admin_site.register(Keywords)
super_admin_site.register(Horses)
super_admin_site.register(Favourite)
super_admin_site.register(Likes)
super_admin_site.register(DisLikes)
super_admin_site.register(Messages)
super_admin_site.register(Conversation)
super_admin_site.register(Report)
super_admin_site.register(PrivacyPolicy)

# feedback models
super_admin_site.register(FeedBack)

# notifications models
super_admin_site.register(Notifications)
super_admin_site.register(PushNotificationsAdmin)


# payment models
super_admin_site.register(StripeSetupIntent)
super_admin_site.register(Cards)
super_admin_site.register(StripeCustomer)
super_admin_site.register(SubscriptionPlans)
super_admin_site.register(PaymentsHistory)


# token proxies
super_admin_site.register(EmailAddress)
super_admin_site.register(TokenProxy)
super_admin_site.register(SocialToken)
super_admin_site.register(SocialAccount)
super_admin_site.register(SocialApp)
super_admin_site.register(ClockedSchedule)
super_admin_site.register(SolarSchedule)
super_admin_site.register(IntervalSchedule)
super_admin_site.register(Site)
