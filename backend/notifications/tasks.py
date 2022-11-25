from celery import shared_task
from celery.utils.log import get_task_logger
from .onesignal_service import sendAdminNotification

logger = get_task_logger(__name__)


@shared_task
def sendPushNotification(notification_name, notification_sendTo):
    sendAdminNotification(notification_sendTo, notification_name)
    logger.info("Notifications Sended")
