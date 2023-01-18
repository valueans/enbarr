from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class PaymentsConfig(AppConfig):
    name = "payments"
    verbose_name = _("Payments")

    def ready(self):
        try:
            import payments.signals  # noqa F401
        except ImportError:
            pass
