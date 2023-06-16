from mixpanel import Mixpanel
from .api.serializers import UserProfileSerializer
from payments.api.v1.serializers import SubscriptionPlansSerializer
from django.conf import settings

mp = Mixpanel(settings.MIXPANEL_API_KEY)

def trackSignUp(userprofile):
    serializer = UserProfileSerializer(userprofile)
    plan_serializer = SubscriptionPlansSerializer(userprofile.subscription_plan)
    serializer.data['subscription_plan']=plan_serializer.data
    mp.track(userprofile.user.id, 'Signed Up',serializer.data)
    
def trackUpgradeSubscription(userprofile):
    plan_serializer = SubscriptionPlansSerializer(userprofile.subscription_plan)
    mp.track(userprofile.user.id, 'Subscription Upgraded',plan_serializer.data)