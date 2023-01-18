from datetime import datetime
import base64
import pyotp
from django.conf import settings
from django.core.mail import send_mail
from django.db.models import F
from .models import User
from datetime import date
from dateutil.relativedelta import relativedelta
from payments.models import SubscriptionPlans


def generateRandom(email):
    return str(email) + str(datetime.date(datetime.now()))


def subscribeUserToFreeSubscription(user):
    try:
        plan = SubscriptionPlans.objects.get(title="Basic")
        user.userprofile.subscription_plan = plan
        user.userprofile.save()
    except:
        pass
    return True


def sendOtpEmail(user):
    keygen = generateRandom(user.email)
    key = base64.b32encode(keygen.encode())
    OTP = pyotp.HOTP(key, digits=4)
    otp = OTP.at(user.otp_counter)
    send_mail(
        "OTP verification",
        f"Your Verification OTP is {otp}",
        settings.SENDGRID_EMAIL,
        [user.email],
        fail_silently=False,
    )
    user = User.objects.filter(email=user.email).update(
        otp_counter=F("otp_counter") + 1
    )
    return True


def verifyOtp(user, otp):
    keygen = generateRandom(user.email)
    key = base64.b32encode(keygen.encode())
    OTP = pyotp.HOTP(key, digits=4)
    if OTP.verify(otp, user.otp_counter - 1):
        user = User.objects.filter(email=user.email).update(is_verified=True)
        return True
    return False


def adminQuerySubscriptionFilter(queryset, month):
    get_year = date.today().year
    filter_month = date(get_year, month, 1)
    next_month = filter_month + relativedelta(months=+1)
    return queryset.distinct().filter(
        subscription_start_date__gte=filter_month,
        subscription_start_date__lt=next_month,
    )


def adminQueryUserFilter(queryset, month):
    get_year = date.today().year
    filter_month = date(get_year, month, 1)
    next_month = filter_month + relativedelta(months=+1)
    return queryset.distinct().filter(
        created_at__gte=filter_month,
        created_at__lt=next_month,
    )
