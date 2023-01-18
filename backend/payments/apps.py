from django.apps import AppConfig


class PaymentsConfig(AppConfig):
    name = "payments"

    def ready(self):
        try:
            import payments.signals
        except ImportError:
            pass
