from datetime import date
from dateutil.relativedelta import relativedelta
from rest_framework.pagination import PageNumberPagination

# method to ban user from posting adds on admin call
def banUserPosting(userprofile, months):
    ban_date = date.today() + relativedelta(months=+months)
    userprofile.ban_user_from_posting = True
    userprofile.ban_user_from_posting_date = ban_date
    userprofile.save()


# method to ban user from app login on admin call
def banUserAppLogin(userprofile, months):
    ban_date = date.today() + relativedelta(months=+months)
    userprofile.ban_user_from_app = True
    userprofile.ban_user_from_app_date = ban_date
    userprofile.save()


# method to get the pagination for specific queryset
def getPagination(queryset, request, serializerClass, many=True):
    paginator = PageNumberPagination()
    paginator.page_size = 20
    result_page = paginator.paginate_queryset(queryset, request)
    serializer = serializerClass(result_page, many=many, context={"request": request})
    return paginator.get_paginated_response(serializer.data)
