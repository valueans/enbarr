from django.contrib import admin
from django.utils.html import format_html
from .helpers import banUserAppLogin, banUserPosting
from .models import Horses, Report, Temperaments, Disciplines, Colors, Breeds, Locations


admin.site.register(Temperaments)
admin.site.register(Disciplines)
admin.site.register(Colors)
admin.site.register(Breeds)
admin.site.register(Locations)


@admin.register(Horses)
class HorsesAdmin(admin.ModelAdmin):
    fields = (
        "horse_image_inside",
        "title",
        "location",
        "price",
        "description",
        "breed",
        "gender",
        "color",
        "height",
        "year_of_birth",
        "temperament",
        "discipline",
        "keywords",
        "uploaded_by",
        "created_at",
        "updated_at",
        "approved",
        "likes",
        "dislikes",
    )
    list_display = [
        "horse_image",
        "title",
        "uploaded_by",
        "price",
        "created_at",
        "updated_at",
        "approved",
        "get_likes",
        "get_dislikes",
    ]
    list_filter = ("approved", "price")
    search_fields = ["title", "uploaded_by__email", "keywords__keyword"]
    readonly_fields = (
        "horse_image",
        "horse_image_inside",
        "created_at",
        "updated_at",
        "keywords",
        "location",
        "likes",
        "dislikes",
        "uploaded_by",
    )
    actions = ["approve_posts", "unapprove_posts"]

    def has_add_permission(self, request):
        return False

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        return qs.all().order_by("-id").order_by("approved")

    def get_likes(self, obj):
        return obj.likes.all().count()

    get_likes.short_description = "Likes"

    def get_dislikes(self, obj):
        return obj.dislikes.all().count()

    get_dislikes.short_description = "DisLikes"

    def approve_posts(modeladmin, request, queryset):
        queryset.update(approved=True)

    def unapprove_posts(modeladmin, request, queryset):
        queryset.update(approved=False)

    approve_posts.short_description = "Approve Posts"
    unapprove_posts.short_description = "Un Approve Posts"

    def horse_image_inside(self, obj):
        div = ""
        for image in obj.images.all():
            try:
                url = image.file.url
            except:
                url = ""
            div += '<a href="{}"> <img src="{}" width=200 height=200/></a>'.format(
                url, url
            )
        return format_html(
            f'<div style="display:flex;flex-direction:row;justify-content:space-evenly;">{div}</div>'
        )

    horse_image_inside.short_description = "Image"
    horse_image_inside.allow_tags = True


@admin.register(Report)
class ReportAdmin(admin.ModelAdmin):
    list_display = [
        "get_content_posted_by",
        "reason",
        "get_user_reported_count",
        "get_user_reported",
        "reviewed",
    ]
    list_filter = (
        "reason",
        "reviewed",
    )
    search_fields = ["user__email", "horse__uploaded_by__email"]
    actions = [
        "delete_content",
        "send_warning_to_published_user",
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
    change_list_template = "admin/change_list.html"

    def has_delete_permission(self, request, obj=None):
        return True

    def has_add_permission(self, request):
        return False

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        return qs.all().order_by("-id").order_by("reviewed")

    def get_content_posted_by(self, obj):
        return obj.horse.uploaded_by.email

    def get_user_reported(self, obj):
        return obj.user.email

    def get_user_reported_count(self, obj):
        count = Report.objects.filter(horse=obj.horse).count()
        return count

    # actions
    def send_warning_to_published_user(modeladmin, request, queryset):
        # a warning will be sended to user
        pass

    def delete_content(modeladmin, request, queryset):
        for query in queryset:
            query.horse.approved = False
            query.horse.save()

    def ban_user_for_1_month_posting(modeladmin, request, queryset):
        for query in queryset:
            banUserPosting(query.horse.uploaded_by.userprofile, 1)

    def ban_user_for_3_month_posting(modeladmin, request, queryset):
        for query in queryset:
            banUserPosting(query.horse.uploaded_by.userprofile, 3)

    def ban_user_for_6_month_posting(modeladmin, request, queryset):
        for query in queryset:
            banUserPosting(query.horse.uploaded_by.userprofile, 6)

    def ban_user_for_9_month_posting(modeladmin, request, queryset):
        for query in queryset:
            banUserPosting(query.horse.uploaded_by.userprofile, 9)

    def ban_user_for_12_month_posting(modeladmin, request, queryset):
        for query in queryset:
            banUserPosting(query.horse.uploaded_by.userprofile, 12)

    def ban_user_from_app_1_month(modeladmin, request, queryset):
        for query in queryset:
            banUserAppLogin(query.horse.uploaded_by.userprofile, 1)

    def ban_user_from_app_3_month(modeladmin, request, queryset):
        for query in queryset:
            banUserAppLogin(query.horse.uploaded_by.userprofile, 3)

    def ban_user_from_app_6_month(modeladmin, request, queryset):
        for query in queryset:
            banUserAppLogin(query.horse.uploaded_by.userprofile, 6)

    def ban_user_from_app_9_month(modeladmin, request, queryset):
        for query in queryset:
            banUserAppLogin(query.horse.uploaded_by.userprofile, 9)

    def ban_user_from_app_12_month(modeladmin, request, queryset):
        for query in queryset:
            banUserAppLogin(query.horse.uploaded_by.userprofile, 12)

    get_content_posted_by.short_description = "Content Posted By"
    get_user_reported.short_description = "Reported By"
    get_user_reported_count.short_description = "Reported Number"
    # actions
    delete_content.short_description = "Delete Content"
    send_warning_to_published_user.short_description = "Send Warning To Published User"
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
