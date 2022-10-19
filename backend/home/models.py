from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()



class ContactUs(models.Model):
    first_name = models.CharField(max_length=100,null=True,blank=True)
    last_name = models.CharField(max_length=100,null=True,blank=True)
    email = models.EmailField(null=True,blank=True)
    query = models.TextField(max_length=1000,null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    

class HorseImages(models.Model):
    file = models.FileField(null=True,blank=True)

class Keywords(models.Model):
    keyword = models.CharField(max_length=100,null=True,blank=True)

class Horses(models.Model):
    images = models.ManyToManyField(HorseImages,related_name="horse_images")
    title = models.CharField(max_length=300,null=True,blank=True)
    location = models.CharField(max_length=500,null=True,blank=True)
    price = models.FloatField(null=True,blank=True)
    description = models.TextField(max_length=2000,null=True,blank=True)
    breed = models.CharField(max_length=100,null=True,blank=True)
    gender = models.CharField(max_length=100,null=True,blank=True)
    age = models.IntegerField(null=True,blank=True)
    color = models.CharField(max_length=100,null=True,blank=True)
    height = models.CharField(max_length=500,null=True,blank=True)
    temprament = models.CharField(max_length=500,null=True,blank=True)
    discipline = models.CharField(max_length=500,null=True,blank=True)
    keywords = models.ManyToManyField(Keywords,related_name="keywords")
    uploaded_by = models.ForeignKey(User,on_delete=models.CASCADE,null=True,blank=True)

class Favourite(models.Model):
    horses = models.ForeignKey(Horses,on_delete=models.CASCADE,null=True,blank=True)
    user = models.ForeignKey(User,on_delete=models.CASCADE,null=True,blank=True)
    