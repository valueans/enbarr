from .views import feedBackView
from django.urls import path


urlpatterns = [
    path("feedback/", feedBackView, name="feedback"),
]
