from django.urls import path
from .views import *

urlpatterns = [
    path("", faqView, name="faq"),
]
