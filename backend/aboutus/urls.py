from django.urls import path
from .views import *

urlpatterns = [
    path("", aboutUsView, name="about-us"),
]