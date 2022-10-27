from django.contrib import admin

from .models import *


admin.site.register(StripeCustomer)
admin.site.register(SubscriptionPlans)
