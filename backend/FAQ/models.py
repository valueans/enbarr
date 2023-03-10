from django.db import models


# Create your models here.
class FAQ(models.Model):
    content = models.TextField(null=True, blank=True)

    class Meta:
        verbose_name_plural = "FAQ"
