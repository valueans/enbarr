from django.urls import path
from .views import *

urlpatterns = [
    path("notifications/", notificationsView, name="notifications"),
]
