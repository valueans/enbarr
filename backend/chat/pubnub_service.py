from django.conf import settings
from pubnub.pnconfiguration import PNConfiguration
from pubnub.pubnub import PubNub
from users.api.serializers import UserProfileSerializer

pnconfig = PNConfiguration()

pnconfig.subscribe_key = settings.PUBNUB_SUBSCRIBED_KEY
pnconfig.publish_key = settings.PUBNUB_PUBLISH_KEY
pnconfig.secret_key = settings.PUBNUB_SECRET_KEY
pnconfig.ssl = False


def unsubcribeChannel(channel_name, user_id):
    pnconfig.uuid = str(user_id)
    pubnub = PubNub(pnconfig)
    response = pubnub.unsubscribe().channels(channel_name).execute()
