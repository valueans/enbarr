from django.contrib.auth import get_user_model
from notifications.models import Notifications
from .models import Report, Horses
from django.db.models.signals import post_save,pre_save
from django.dispatch import receiver
from .helpers import getUserLocationAddress,getLatLongFromAddress
from .googlemaps_services import extract_lat_long_via_address
from users.models import UserSearchSave
from django.contrib.gis.geos import Point

User = get_user_model()


@receiver(post_save, sender=Report)
def create_notification_report(sender, instance, created, **kwargs):
    user = User.objects.filter(is_superuser=True).first()
    description = f"{instance.user.email} has reported horse {instance.horse.title} with id {instance.horse.id} as {instance.reason}"
    Notifications.objects.create(
        user=user, description=description, type="HORSE REPORT"
    )
    
    
@receiver(pre_save, sender=Horses)
def saveAddress(sender, instance, *args, **kwargs):
    try:
        address = getUserLocationAddress(instance.user_location[1],instance.user_location[0])
        instance.state = address['state']
        instance.state_code = address['ISO3166-2-lvl4'].split("-")[1]
        instance.country = address['country_code'].upper()
        
        if "city" in address:
            instance.city = address['city']
        if "town" in address:
            instance.city = address['town']
        
        if address['postcode']:
            instance.zip_code = address['postcode']
    except:
        pass


@receiver(pre_save, sender=UserSearchSave)
def saveLatLngFromAddress(sender, instance, *args, **kwargs):
    if instance.country and instance.state and instance.city:
        lat,lng = extract_lat_long_via_address(f"{instance.city} {instance.state} {instance.country}")
        print("lat",lat)
        print("lng",lng)
        instance.address_location = Point(lng,lat)
    