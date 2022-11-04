from datetime import date
from dateutil.relativedelta import relativedelta


def banUserPosting(user, months):
    print(months)
    ban_date = date.today() + relativedelta(months=+months)
    user.ban_user_from_posting = True
    user.ban_user_from_posting_date = ban_date
    user.save()


def banUserAppLogin(user, months):
    ban_date = date.today() + relativedelta(months=+months)
    user.ban_user_from_app = True
    user.ban_user_from_app_date = ban_date
    user.save()
