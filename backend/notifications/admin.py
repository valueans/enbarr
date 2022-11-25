from django.contrib import admin
from .models import PushNotificationsAdmin


@admin.register(PushNotificationsAdmin)
class PushNotificationsAdmin(admin.ModelAdmin):
    list_display = ["name", "run_at", "send_to", "active"]
    search_fields = ("name",)
    list_filter = ("active",)
    actions = ["notification_status_active", "notification_status_deactive"]

    def notification_status_active(modeladmin, request, queryset):
        for query in queryset:
            query.active = True
            query.save()

    def notification_status_deactive(modeladmin, request, queryset):
        for query in queryset:
            query.active = False
            query.save()

    def has_change_permission(self, request=None, obj=None):
        return False

    notification_status_active.short_description = "Activate Notifications"
    notification_status_deactive.short_description = "Deactivate Notifications"
