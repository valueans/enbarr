from django.urls import path
from .views import conversationView, pubnub_webhook,blockConversationView


urlpatterns = [
    path("conversation/", conversationView, name="conversation"),
    path("block_conversation/", blockConversationView, name="block_conversation"),
    path("webhook/", pubnub_webhook, name="pubnub_webhook"),
]
