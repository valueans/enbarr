from django.contrib import admin
from django.contrib.auth import get_user_model
from .models import UserProfile
from home.helpers import banUserAppLogin, banUserPosting
from .helpers import adminQuerySubscriptionFilter, adminQueryUserFilter
from .forms import UserCreationForm

User = get_user_model()

# list filter by month
class UserSubscriptionFilter(admin.SimpleListFilter):
    title = "Subscription Month"  # a label for our filter
    parameter_name = "subscription_start_date"  # you can put anything here

    def lookups(self, request, model_admin):
        # This is where you create filter options; we have two:
        return [
            ("1", "January"),
            ("2", "Feburary"),
            ("3", "March"),
            ("4", "April"),
            ("5", "May"),
            ("6", "June"),
            ("7", "July"),
            ("8", "August"),
            ("9", "September"),
            ("10", "October"),
            ("11", "November"),
            ("12", "December"),
        ]

    def queryset(self, request, queryset):
        try:
            month = int(request.GET.get("subscription_start_date"))
            return adminQuerySubscriptionFilter(queryset=queryset, month=month)
        except:
            return None


class NewUserFilter(admin.SimpleListFilter):
    title = "New User"  # a label for our filter
    parameter_name = "new_users"  # you can put anything here

    def lookups(self, request, model_admin):
        # This is where you create filter options; we have two:
        return [
            ("1", "January"),
            ("2", "Feburary"),
            ("3", "March"),
            ("4", "April"),
            ("5", "May"),
            ("6", "June"),
            ("7", "July"),
            ("8", "August"),
            ("9", "September"),
            ("10", "October"),
            ("11", "November"),
            ("12", "December"),
        ]

    def queryset(self, request, queryset):
        try:
            month = int(request.GET.get("new_users"))
            return adminQueryUserFilter(queryset=queryset, month=month)
        except:
            return None


@admin.register(UserProfile)
class UserProfile(admin.ModelAdmin):

    list_display = [
        "get_username",
        "get_email",
        "get_is_superuser",
        "subscription_plan",
        "get_subscribe_date",
        "get_subscribe_renew_date",
        "get_promotion_adds",
        "ban_user_from_posting",
        "ban_user_from_app",
    ]
    list_filter = (
        "subscription_plan__title",
        "user__is_superuser",
        UserSubscriptionFilter,
        NewUserFilter,
    )
    search_fields = ["user__email", "user__username"]
    actions = [
        "unban_user_posting",
        "unban_user_app_login",
        "ban_user_for_1_month_posting",
        "ban_user_from_app_1_month",
        "ban_user_for_3_month_posting",
        "ban_user_from_app_3_month",
        "ban_user_for_6_month_posting",
        "ban_user_from_app_6_month",
        "ban_user_for_9_month_posting",
        "ban_user_from_app_9_month",
        "ban_user_for_12_month_posting",
        "ban_user_from_app_12_month",
    ]

    def has_add_permission(self, request):
        return False

    # custom list display
    def get_email(self, obj):
        return obj.user.email

    def get_username(self, obj):
        return obj.user.username

    def get_is_superuser(self, obj):
        return obj.user.is_superuser

    def get_promotion_adds(self, obj):
        return obj.promotion_adds

    def get_subscribe_date(self, obj):
        try:
            subcription_date = obj.subscription_start_date.strftime("%Y-%m-%d %H:%M:%S")
            return subcription_date
        except:
            return None

    def get_subscribe_renew_date(self, obj):
        try:
            renew_date = obj.subscription_renew_date.strftime("%Y-%m-%d %H:%M:%S")
            return renew_date
        except:
            return None

    # actions

    def ban_user_for_1_month_posting(modeladmin, request, queryset):
        for query in queryset:
            banUserPosting(query, 1)

    def ban_user_for_3_month_posting(modeladmin, request, queryset):
        for query in queryset:
            banUserPosting(query, 3)

    def ban_user_for_6_month_posting(modeladmin, request, queryset):
        for query in queryset:
            banUserPosting(query, 6)

    def ban_user_for_9_month_posting(modeladmin, request, queryset):
        for query in queryset:
            banUserPosting(query, 9)

    def ban_user_for_12_month_posting(modeladmin, request, queryset):
        for query in queryset:
            banUserPosting(query, 12)

    def ban_user_from_app_1_month(modeladmin, request, queryset):
        for query in queryset:
            banUserAppLogin(query, 1)

    def ban_user_from_app_3_month(modeladmin, request, queryset):
        for query in queryset:
            banUserAppLogin(query, 3)

    def ban_user_from_app_6_month(modeladmin, request, queryset):
        for query in queryset:
            banUserAppLogin(query, 6)

    def ban_user_from_app_9_month(modeladmin, request, queryset):
        for query in queryset:
            banUserAppLogin(query, 9)

    def ban_user_from_app_12_month(modeladmin, request, queryset):
        for query in queryset:
            banUserAppLogin(query, 12)

    def unban_user_posting(modeladmin, request, queryset):
        for query in queryset:
            query.ban_user_from_posting = False
            query.save()

    def unban_user_app_login(modeladmin, request, queryset):
        for query in queryset:
            query.ban_user_from_app = False
            query.save()

    # actions

    ban_user_for_1_month_posting.short_description = (
        "Ban User for 1 months from posting adds"
    )
    ban_user_for_3_month_posting.short_description = (
        "Ban User for 3 months from posting adds"
    )
    ban_user_for_6_month_posting.short_description = (
        "Ban User for 6 months from posting adds"
    )
    ban_user_for_9_month_posting.short_description = (
        "Ban User for 9 months from posting adds"
    )
    ban_user_for_12_month_posting.short_description = (
        "Ban User for 12 months from posting adds"
    )
    ban_user_from_app_1_month.short_description = "Ban User from Application for 1"
    ban_user_from_app_3_month.short_description = "Ban User from Application for 3"
    ban_user_from_app_6_month.short_description = "Ban User from Application for 6"
    ban_user_from_app_9_month.short_description = "Ban User from Application for 9"
    ban_user_from_app_12_month.short_description = "Ban User from Application for 12"
    unban_user_posting.short_description = "Unban User Posting"
    unban_user_app_login.short_description = "Unban User Login"

    # list display
    get_username.short_description = "Username"
    get_email.short_description = "Email"
    get_is_superuser.short_description = "Super User"
    get_subscribe_renew_date.short_description = "Renew Subscription Date"
    get_subscribe_date.short_description = "Subscribed On"
    get_promotion_adds.short_description = "Remaining Promotion Adds"
