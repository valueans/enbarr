from django.urls import path
from .viewsets import (
    ContactUsView,
    ReportView,
    favouriteView,
    termAndConditionView,
    privacyPolicyView,
    HorseImagesView,
    KeywordsView,
    HorseView,
    HorsesView,
    searchHorseView,
    userSearchView,
    likeHorseView,
    dislikeHorseView,
)


urlpatterns = [
    path("contactus/", ContactUsView, name="contactus"),
    path("terms-and-condition/", termAndConditionView, name="terms-and-condition"),
    path("privacy-policy/", privacyPolicyView, name="privacy-policy"),
    path("horse-images/", HorseImagesView, name="horse-images"),
    path("keywords/", KeywordsView, name="keywords"),
    path("horse/", HorseView, name="horse"),
    path("horses/", HorsesView, name="horses"),
    path("favourite/", favouriteView, name="favourite"),
    path("search-horse/", searchHorseView, name="search-horse"),
    path("user-saved-search/", userSearchView, name="user-saved-search"),
    path("like-horse/", likeHorseView, name="like-horse"),
    path("dislike-horse/", dislikeHorseView, name="dislike-horse"),
    path("report/", ReportView, name="report"),
]
