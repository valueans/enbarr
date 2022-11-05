from datetime import date
from dateutil.relativedelta import relativedelta


def banUserPosting(userprofile, months):
    ban_date = date.today() + relativedelta(months=+months)
    userprofile.ban_user_from_posting = True
    userprofile.ban_user_from_posting_date = ban_date
    userprofile.save()


def banUserAppLogin(userprofile, months):
    ban_date = date.today() + relativedelta(months=+months)
    userprofile.ban_user_from_app = True
    userprofile.ban_user_from_app_date = ban_date
    userprofile.save()
