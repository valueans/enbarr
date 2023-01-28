from django.conf import settings
from pubnub.pnconfiguration import PNConfiguration
from pubnub.pubnub import PubNub
from users.api.serializers import UserSerializer

pnconfig = PNConfiguration()

pnconfig.subscribe_key = settings.PUBNUB_SUBSCRIBED_KEY
pnconfig.publish_key = settings.PUBNUB_PUBLISH_KEY
pnconfig.secret_key = settings.PUBNUB_SECRET_KEY
pnconfig.ssl = False


def publish_callback(result, status):
    if status.is_error():
        return {
            "status": "error",
            "message": status.error_data.exception,
            "category": status.category,
        }
    else:
        return result


def subcribeChannel(channel_name, user_id):
    pnconfig.user_id = str(user_id)
    pubnub = PubNub(pnconfig)
    pubnub.subscribe().channels(channel_name).execute()


def unsubcribeChannel(channel_name, user_id):
    pnconfig.user_id = str(user_id)
    pubnub = PubNub(pnconfig)
    pubnub.subscribe().channels(channel_name).execute()


def sendMessage(channel_name, user, message):
    sender_user_serializer = UserSerializer(user)
    pnconfig.user_id = str(user.id)
    pubnub = PubNub(pnconfig)
    pubnub.publish().channel(channel_name).message({"text": message}).should_store(
        True
    ).meta(sender_user_serializer.data).pn_async(publish_callback)
