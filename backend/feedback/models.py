from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class FeedBack(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    email = models.EmailField(null=False, blank=False)
    message = models.TextField(null=False, blank=False)
    response = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"{self.user.email} => {self.message}"
