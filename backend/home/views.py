from django.shortcuts import render
from django.conf import settings

def home(request):
    return render(request, "base.html",{"DEBUG":settings.DEBUG})
