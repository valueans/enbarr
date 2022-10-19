import json
from rest_framework import status
from django.test import TestCase
from django.urls import reverse
from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework.test import APIClient

from home.models import HorseImages, Horses, ContactUs, Favourite
from PIL import Image
import tempfile
from django.contrib.auth import get_user_model

User = get_user_model()


class TestHomeAPI(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create(email="jhondeo@example.com")
        self.user.set_password("@KLxRGG9qPdwKzy")
        self.user.save()
        self.client.force_authenticate(user=self.user)
        self.horse = Horses.objects.create(
            title="horse 1",
            location="abc",
            price=4500.00,
            description="lorem ipsum",
            breed="breed 1",
            gender="mare",
            age=18,
            color="black",
            height="6 ft",
            temprament="xyz",
            discipline="xyz",
        )
        self.horse.save()

    def test_keyword_get(self):
        response = self.client.get(reverse("keywords"), format="json")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_keyword_post(self):
        payload = {
            "keyword": "keyword 1",
        }

        response = self.client.post(reverse("keywords"), payload, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_favourite_get(self):
        response = self.client.get(reverse("favourite"), format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_favourite_post_400(self):

        payload = {
            "horses": 10,
        }
        response = self.client.post(reverse("favourite"), payload, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_favourite_post_201(self):

        payload = {
            "horses": self.horse.id,
        }
        response = self.client.post(reverse("favourite"), payload, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
