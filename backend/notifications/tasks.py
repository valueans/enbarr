from celery import shared_task
from celery.utils.log import get_task_logger

logger = get_task_logger(__name__)


@shared_task
def sendPushNotification(notification_name, notification_sendTo):
    logger.info(notification_name)
    logger.info(notification_sendTo)
    logger.info("Notifications Sended")
    return "Sended"
