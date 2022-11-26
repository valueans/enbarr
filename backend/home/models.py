from django.db import models
from django.contrib.auth import get_user_model
from django.utils.html import format_html

User = get_user_model()

REPORT_REASON = (
    ("Spam", "Spam"),
    ("Pornography", "Pornography"),
    ("Self-harm", "Self-harm"),
    ("Not for children", "Not for children"),
    (
        "Illegal activities (e.g. drug selling)",
        "Illegal activities (e.g. drug selling)",
    ),
    ("Deceptive content", "Deceptive content"),
)


class ContactUs(models.Model):
    first_name = models.CharField(max_length=100, null=True, blank=True)
    last_name = models.CharField(max_length=100, null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    query = models.TextField(max_length=1000, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)


class HorseImages(models.Model):
    file = models.FileField(null=False, blank=False)

    def __str__(self):
        try:
            url = self.file.url
        except:
            url = ""
        return url


class Keywords(models.Model):
    keyword = models.CharField(max_length=100, null=False, blank=False)

    def __str__(self):
        return self.keyword


class Horses(models.Model):
    images = models.ManyToManyField(HorseImages, related_name="horse_images")
    title = models.CharField(max_length=300, null=True, blank=True)
    location = models.CharField(max_length=500, null=True, blank=True)
    price = models.FloatField(null=True, blank=True)
    description = models.TextField(max_length=2000, null=True, blank=True)
    breed = models.CharField(max_length=100, null=True, blank=True)
    gender = models.CharField(max_length=100, null=True, blank=True)
    age = models.IntegerField(null=True, blank=True)
    color = models.CharField(max_length=100, null=True, blank=True)
    height = models.CharField(max_length=500, null=True, blank=True)
    temperament = models.CharField(max_length=500, null=True, blank=True)
    discipline = models.CharField(max_length=500, null=True, blank=True)
    keywords = models.ManyToManyField(Keywords, related_name="keywords")
    likes = models.ManyToManyField("Likes", related_name="likes", blank=True)
    dislikes = models.ManyToManyField("DisLikes", related_name="dislikes", blank=True)
    uploaded_by = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, blank=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    approved = models.BooleanField(default=False)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = "Horses"

    def horse_image(self):
        try:
            url = self.images.all().first().file.url
        except:
            url = ""
        return format_html('<img src="{}" width="100" height=100/>'.format(url))

    horse_image.short_description = "Image"
    horse_image.allow_tags = True


class Favourite(models.Model):
    horses = models.ForeignKey(Horses, on_delete=models.CASCADE, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)


class Likes(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return f"{self.user.email}"


class DisLikes(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return f"{self.user.email}"


class Report(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    horse = models.ForeignKey(Horses, on_delete=models.CASCADE, null=True, blank=True)
    reason = models.CharField(
        max_length=1000, choices=REPORT_REASON, null=True, blank=True
    )
    reviewed = models.BooleanField(default=False)


class PrivacyPolicy(models.Model):
    body = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(
        auto_now_add=True,
    )
    updated_at = models.DateTimeField(
        auto_now=True,
    )
