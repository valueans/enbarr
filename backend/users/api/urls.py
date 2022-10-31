from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    verifyOtpView,
    deleteUserView,
    userProfileView,
    deleteUserView,
    resetEmailView,
    resetEmailView,
    resetPasswordView,
    sendOtpView,
    SignupViewSet,
    LoginViewSet,
    FacebookLogin,
    GoogleLogin,
    AppleLogin,
)


router = DefaultRouter()
router.register("signup", SignupViewSet, basename="signup")
router.register("login", LoginViewSet, basename="login")

urlpatterns = [
    path("facebook/", FacebookLogin.as_view(), name="facebook"),
    path("google/", GoogleLogin.as_view(), name="google"),
    path("apple/", AppleLogin.as_view(), name="apple"),
    path("userprofile/", userProfileView, name="user-profile"),
    path("verifyotp/", verifyOtpView, name="verify-otp"),
    path("sendotp/", sendOtpView, name="send-otp"),
    path("reset-password/", resetPasswordView, name="reset-password"),
    path("reset-email/", resetEmailView, name="reset-email"),
    path("delete-user/", deleteUserView, name="delete-user"),
    path("", include(router.urls)),
]
