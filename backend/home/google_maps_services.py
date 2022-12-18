import requests
from django.conf import settings
import json


def getDistance(user_location, horse_location):
    url = f"https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins={user_location}&destinations={horse_location}&key={settings.GOOGLE_MAPS_API_KEY}"
    payload = {}
    headers = {}
    response = requests.request("GET", url, headers=headers, data=payload)
    data = json.loads(response.text)
    distance = data["rows"][0]["elements"][0]["distance"]["text"]
    return distance


def getAddress(location):
    url = f"https://maps.googleapis.com/maps/api/geocode/json?address={location}&key={settings.GOOGLE_MAPS_API_KEY}"
    payload = {}
    headers = {}
    response = requests.request("GET", url, headers=headers, data=payload)
    data = json.loads(response.text)
    state = ""
    country = ""
    for item in data["results"][0]["address_components"]:
        try:
            if item["types"][0] == "country":
                country = item["long_name"]
            elif item["types"][0] == "administrative_area_level_1":
                state = item["long_name"]
        except:
            pass
    return state, country
