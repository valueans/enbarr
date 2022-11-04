from datetime import datetime
from django.contrib import admin
from django.contrib.auth import get_user_model
from .models import UserProfile
from datetime import date
from dateutil.relativedelta import relativedelta
from django.utils.html import format_html

User = get_user_model()


class UserDateFilter(admin.SimpleListFilter):
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
        if self.value() == "1":
            get_year = date.today().year
            filter_month = date(get_year, 1, 1)
            next_month = filter_month + relativedelta(months=+1)
            return queryset.distinct().filter(
                subscription_start_date__gte=filter_month,
                subscription_start_date__lt=next_month,
            )
        if self.value() == "2":
            get_year = date.today().year
            filter_month = date(get_year, 2, 1)
            next_month = filter_month + relativedelta(months=+1)
            return queryset.distinct().filter(
                subscription_start_date__gte=filter_month,
                subscription_start_date__lt=next_month,
            )
        if self.value() == "3":
            get_year = date.today().year
            filter_month = date(get_year, 3, 1)
            next_month = filter_month + relativedelta(months=+1)
            return queryset.distinct().filter(
                subscription_start_date__gte=filter_month,
                subscription_start_date__lt=next_month,
            )
        if self.value() == "4":
            get_year = date.today().year
            filter_month = date(get_year, 4, 1)
            next_month = filter_month + relativedelta(months=+1)
            return queryset.distinct().filter(
                subscription_start_date__gte=filter_month,
                subscription_start_date__lt=next_month,
            )
        if self.value() == "5":
            get_year = date.today().year
            filter_month = date(get_year, 5, 1)
            next_month = filter_month + relativedelta(months=+1)
            return queryset.distinct().filter(
                subscription_start_date__gte=filter_month,
                subscription_start_date__lt=next_month,
            )
        if self.value() == "6":
            get_year = date.today().year
            filter_month = date(get_year, 6, 1)
            next_month = filter_month + relativedelta(months=+1)
            return queryset.distinct().filter(
                subscription_start_date__gte=filter_month,
                subscription_start_date__lt=next_month,
            )
        if self.value() == "7":
            get_year = date.today().year
            filter_month = date(get_year, 7, 1)
            next_month = filter_month + relativedelta(months=+1)
            return queryset.distinct().filter(
                subscription_start_date__gte=filter_month,
                subscription_start_date__lt=next_month,
            )
        if self.value() == "8":
            get_year = date.today().year
            filter_month = date(get_year, 8, 1)
            next_month = filter_month + relativedelta(months=+1)
            return queryset.distinct().filter(
                subscription_start_date__gte=filter_month,
                subscription_start_date__lt=next_month,
            )
        if self.value() == "9":
            get_year = date.today().year
            filter_month = date(get_year, 9, 1)
            next_month = filter_month + relativedelta(months=+1)
            return queryset.distinct().filter(
                subscription_start_date__gte=filter_month,
                subscription_start_date__lt=next_month,
            )
        if self.value() == "10":
            get_year = date.today().year
            filter_month = date(get_year, 10, 1)
            next_month = filter_month + relativedelta(months=+1)
            return queryset.distinct().filter(
                subscription_start_date__gte=filter_month,
                subscription_start_date__lt=next_month,
            )
        if self.value() == "11":
            get_year = date.today().year
            filter_month = date(get_year, 11, 1)
            next_month = filter_month + relativedelta(months=+1)
            return queryset.distinct().filter(
                subscription_start_date__gte=filter_month,
                subscription_start_date__lt=next_month,
            )
        if self.value() == "12":
            get_year = date.today().year
            filter_month = date(get_year, 12, 1)
            next_month = filter_month + relativedelta(months=+1)
            return queryset.distinct().filter(
                subscription_start_date__gte=filter_month,
                subscription_start_date__lt=next_month,
            )


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
    ]
    list_filter = ("subscription_plan__title", "user__is_superuser", UserDateFilter)
    search_fields = ["user__email", "user__username"]

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

    get_username.short_description = "Username"
    get_email.short_description = "Email"
    get_is_superuser.short_description = "Super User"
    get_subscribe_renew_date.short_description = "Renew Subscription Date"
    get_subscribe_date.short_description = "Subscribed On"
    get_promotion_adds.short_description = "Remaining Promotion Adds"
