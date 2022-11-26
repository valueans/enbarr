from django.urls import path
from .views import messagesView, conversationView, pubnub_webhook


urlpatterns = [
    path("messages/", messagesView, name="messages"),
    path("conversation/", conversationView, name="conversation"),
    path("webhook/", pubnub_webhook, name="pubnub_webhook"),
]
