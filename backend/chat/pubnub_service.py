from django.conf import settings
from pubnub.pnconfiguration import PNConfiguration
from pubnub.pubnub import PubNub

pnconfig = PNConfiguration()

pnconfig.subscribe_key = settings.PUBNUB_SUBSCRIBED_KEY
pnconfig.publish_key = settings.PUBNUB_PUBLISH_KEY
pnconfig.secret_key = settings.PUBNUB_SECRET_KEY
pnconfig.ssl = False


def publish_callback(result, status):
    if status.is_error():
        print("Error %s" % str(status.error_data.exception))
        print("Error category #%d" % status.category)
    else:
        print(str(result))


def subcribeChannel(channel_name, user_id):
    pnconfig.user_id = str(user_id)
    pubnub = PubNub(pnconfig)
    pubnub.subscribe().channels(channel_name, "alerts.system").execute()


def unsubcribeChannel(channel_name, user_id):
    pnconfig.user_id = str(user_id)
    pubnub = PubNub(pnconfig)
    pubnub.subscribe().channels(channel_name, "alerts.system").execute()


def sendMessage(channel_name, user_id, message):
    pnconfig.user_id = str(user_id)
    pubnub = PubNub(pnconfig)
    pubnub.publish().channel(channel_name).message({"text": message}).should_store(
        True
    ).pn_async(publish_callback)
