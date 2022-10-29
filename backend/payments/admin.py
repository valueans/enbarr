from django.contrib import admin

from .models import *


@admin.register(SubscriptionPlans)
class SubscriptionPlans(admin.ModelAdmin):
    list_display = ["title", "description", "price", "status"]
