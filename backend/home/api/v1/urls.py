from django.urls import path, include
from rest_framework.routers import DefaultRouter

from home.api.v1.viewsets import (
    SignupViewSet,
    LoginViewSet,
)

from users.views import FacebookLogin, GoogleLogin, AppleLogin
from .viewsets import (
    ContactUsView,
    favouriteView,
    termAndConditionView,
    HorseImagesView,
    KeywordsView,
    HorseView,
    userProfileView,
    plansView,
    notificationsView,
    searchHorseView,
    userSearchView,
)


router = DefaultRouter()
router.register("signup", SignupViewSet, basename="signup")
router.register("login", LoginViewSet, basename="login")

urlpatterns = [
    path("facebook/", FacebookLogin.as_view(), name="facebook"),
    path("google/", GoogleLogin.as_view(), name="google"),
    path("apple/", AppleLogin.as_view(), name="apple"),
    path("contactus/", ContactUsView, name="contactus"),
    path("terms-and-condition/", termAndConditionView, name="terms-and-condition"),
    path("horse-images/", HorseImagesView, name="horse-images"),
    path("keywords/", KeywordsView, name="keywords"),
    path("horse/", HorseView, name="horse"),
    path("favourite/", favouriteView, name="favourite"),
    path("userprofile/", userProfileView, name="user-profile"),
    path("plans/", plansView, name="plans"),
    path("notifications/", notificationsView, name="notifications"),
    path("search-horse/", searchHorseView, name="search-horse"),
    path("user-saved-search/", userSearchView, name="user-saved-search"),
    path("", include(router.urls)),
]
