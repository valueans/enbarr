from django.db import models


class TermAndCondition(models.Model):
    content = models.TextField(null=True,blank=True)
    
    class Meta:
        verbose_name="Terms And Condition"
