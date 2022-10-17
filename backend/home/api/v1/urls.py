from django.urls import path, include
from rest_framework.routers import DefaultRouter

from home.api.v1.viewsets import (
    SignupViewSet,
    LoginViewSet,
)
from users.views import FacebookLogin,GoogleLogin,AppleLogin

router = DefaultRouter()
router.register("signup", SignupViewSet, basename="signup")
router.register("login", LoginViewSet, basename="login")

urlpatterns = [
    path("facebook/",FacebookLogin.as_view(),name="facebook"),
    path("google/",GoogleLogin.as_view(),name="google"),
    path("apple/",AppleLogin.as_view(),name="apple"),
    path("", include(router.urls)),
]
