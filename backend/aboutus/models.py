from django.db import models



class AboutUs(models.Model):
    content = models.TextField(null=True,blank=True)
    class Meta:
        verbose_name_plural = "About Us"