from email.policy import default
from django.db import models
from django.contrib.auth import get_user_model

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
    file = models.FileField(null=True, blank=True)


class Keywords(models.Model):
    keyword = models.CharField(max_length=100, null=True, blank=True)


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
    temprament = models.CharField(max_length=500, null=True, blank=True)
    discipline = models.CharField(max_length=500, null=True, blank=True)
    keywords = models.ManyToManyField(Keywords, related_name="keywords")
    likes = models.ManyToManyField("Likes", related_name="likes")
    dislikes = models.ManyToManyField("DisLikes", related_name="dislikes")
    uploaded_by = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, blank=True
    )


class Favourite(models.Model):
    horses = models.ForeignKey(Horses, on_delete=models.CASCADE, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)


class Likes(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)


class DisLikes(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)


class Messages(models.Model):
    sender = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, blank=True, related_name="sender"
    )
    receiver = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, blank=True, related_name="receiver"
    )
    message = models.TextField(null=True, blank=True)
    file = models.FileField(null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)


class Conversation(models.Model):
    user_one = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, blank=True, related_name="userone"
    )
    user_two = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, blank=True, related_name="usertwo"
    )
    message = models.ManyToManyField(Messages, related_name="messages")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Report(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    horse = models.ForeignKey(Horses, on_delete=models.CASCADE, null=True, blank=True)
    reason = models.CharField(
        max_length=1000, choices=REPORT_REASON, null=True, blank=True
    )
