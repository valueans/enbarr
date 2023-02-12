from django.urls import path
from .views import *

urlpatterns = [
    path("notifications/", notificationsView, name="notifications"),
    path(
        "read-all-notifications/",
        readAllnotificationView,
        name="read-all-notifications",
    ),
]
