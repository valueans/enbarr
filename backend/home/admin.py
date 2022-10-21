from django.contrib import admin
from .models import (
    ContactUs,
    Conversation,
    HorseImages,
    Keywords,
    Horses,
    Favourite,
    Messages,
    Report,
)


admin.site.register(ContactUs)
admin.site.register(HorseImages)
admin.site.register(Keywords)
admin.site.register(Horses)
admin.site.register(Favourite)
admin.site.register(Messages)
admin.site.register(Conversation)
admin.site.register(Report)
