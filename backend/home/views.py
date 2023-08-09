from django.shortcuts import render
from django.conf import settings

def home(request):
    return render(request, "base.html",context={"DEBUG":settings.DEBUG})
