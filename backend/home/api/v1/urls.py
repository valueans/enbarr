from django.urls import path
from .viewsets import (
    ContactUsView,
    ReportView,
    favouriteView,
    messagesView,
    termAndConditionView,
    privacyPolicyView,
    HorseImagesView,
    KeywordsView,
    HorseView,
    searchHorseView,
    userSearchView,
    likeHorseView,
    dislikeHorseView,
    conversationView,
)


urlpatterns = [
    path("contactus/", ContactUsView, name="contactus"),
    path("terms-and-condition/", termAndConditionView, name="terms-and-condition"),
    path("privacy-policy/", privacyPolicyView, name="privacy-policy"),
    path("horse-images/", HorseImagesView, name="horse-images"),
    path("keywords/", KeywordsView, name="keywords"),
    path("horse/", HorseView, name="horse"),
    path("favourite/", favouriteView, name="favourite"),
    path("search-horse/", searchHorseView, name="search-horse"),
    path("user-saved-search/", userSearchView, name="user-saved-search"),
    path("like-horse/", likeHorseView, name="like-horse"),
    path("dislike-horse/", dislikeHorseView, name="dislike-horse"),
    path("messages/", messagesView, name="messages"),
    path("conversation/", conversationView, name="conversation"),
    path("report/", ReportView, name="report"),
]
