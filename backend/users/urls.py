from django.urls import path, include

from users.views import (
    UserRedirectView,
    UserDetailView,
    UserUpdateView,
)

app_name = "users"
urlpatterns = [
    path("<str:username>/", view=UserDetailView.as_view(), name="detail"),
    path("~redirect/", view=UserRedirectView.as_view(), name="redirect"),
    path("~update/", view=UserUpdateView.as_view(), name="update"),
    path("api/v1/", include("users.api.urls")),
]
