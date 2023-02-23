from django.db import models



class PrivacyPolicy(models.Model):
    content = models.TextField(null=True,blank=True)

    class Meta:
        verbose_name_plural = "Privacy Policy"