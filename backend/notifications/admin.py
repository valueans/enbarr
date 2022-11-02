from django.contrib import admin
from .models import PushNotificationsAdmin


@admin.register(PushNotificationsAdmin)
class PushNotificationsAdmin(admin.ModelAdmin):
    list_display = ["name", "run_at", "send_to", "active"]
    search_fields = ("name",)
    list_filter = ("active",)
