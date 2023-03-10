from django.db import models


class SocialLinks(models.Model):
    facebook = models.CharField(max_length=1000, null=True, blank=True, default="")
    instagram = models.CharField(max_length=1000, null=True, blank=True, default="")
    twitter = models.CharField(max_length=1000, null=True, blank=True, default="")
    linkedIn = models.CharField(max_length=1000, null=True, blank=True, default="")
    appleStoreLink = models.CharField(
        max_length=1000, null=True, blank=True, default=""
    )
    googleStoreLink = models.CharField(
        max_length=1000, null=True, blank=True, default=""
    )

    class Meta:
        verbose_name_plural = "Social Media Platform Links"
