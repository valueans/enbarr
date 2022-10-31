from django.contrib import admin

from .models import FeedBack


@admin.register(FeedBack)
class FeedBackAdmin(admin.ModelAdmin):
    list_display = ["email", "message", "response"]
    list_filter = ("email",)
    search_fields = ["user__email", "email"]

    def has_add_permission(self, request):
        return None
