from django.urls import path, include
from rest_framework.routers import DefaultRouter

from home.api.v1.viewsets import (
    SignupViewSet,
    LoginViewSet,
)
from users.views import user_facebook_social_view,user_google_social_view,user_apple_social_view

router = DefaultRouter()
router.register("signup", SignupViewSet, basename="signup")
router.register("login", LoginViewSet, basename="login")

urlpatterns = [
    path("facebook/",user_facebook_social_view,name="facebook"),
    path("google/",user_google_social_view,name="google"),
    path("apple/",user_apple_social_view,name="apple"),
    path("", include(router.urls)),
]
