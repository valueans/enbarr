from django.urls import re_path
from .views import home

urlpatterns = [
    path('', home,name="home")
]
