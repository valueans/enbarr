from django.contrib import admin
from django.contrib.auth import admin as auth_admin
from django.contrib.auth import get_user_model
from users.forms import UserChangeForm, UserCreationForm
from .models import UserProfile

User = get_user_model()


@admin.register(UserProfile)
class UserProfile(admin.ModelAdmin):
    list_display = [
        "get_username",
        "get_email",
        "get_is_superuser",
        "subscription_plan",
    ]
    list_filter = ("subscription_plan", "user__is_superuser")
    search_fields = ["user__email", "user__username"]

    def get_email(self, obj):
        return obj.user.email

    get_email.short_description = "Email"

    def get_username(self, obj):
        return obj.user.username

    get_username.short_description = "Username"

    def get_is_superuser(self, obj):
        return obj.user.is_superuser

    get_is_superuser.short_description = "Super User"

    def has_add_permission(self, request):
        return False

    def has_delete_permission(self, request, obj=None):
        return False
