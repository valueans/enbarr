from celery import shared_task
from celery.utils.log import get_task_logger
import stripe
from .api.v1.helpers import createStripeCustomer
from django.contrib.auth import get_user_model
from .api.v1.helpers import createMonthlySubscriptionCharge

User = get_user_model()
logger = get_task_logger(__name__)


@shared_task
def chargeCustomerEveryMonth(user_id):
    logger.info("running subscription")
    user = User.objects.get(id=user_id)
    response = createMonthlySubscriptionCharge(user)
    logger.info(response)
