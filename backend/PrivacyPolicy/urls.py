from django.urls import path
from .views import *

urlpatterns = [
    path("", privacyPolicyView, name="privacy-policy"),
]