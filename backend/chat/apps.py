from django.apps import AppConfig
from django.utils.translation import ugettext_lazy as _


class ChatConfig(AppConfig):
    name = "chat"
    verbose_name = _("chat")

    def ready(self):
        try:
            import chat.signals
        except ImportError:
            pass
