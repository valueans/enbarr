from django.urls import path
from .views import conversationView, pubnub_webhook


urlpatterns = [
    path("conversation/", conversationView, name="conversation"),
    path("webhook/", pubnub_webhook, name="pubnub_webhook"),
]
