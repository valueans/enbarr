from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.authentication import TokenAuthentication
from rest_framework import status
from rest_framework.decorators import api_view,permission_classes,authentication_classes
from modules.terms_and_conditions.terms_and_conditions.models import TermAndCondition
from modules.terms_and_conditions.terms_and_conditions.serializers import TermAndConditionSerializer
from drf_yasg.utils import swagger_auto_schema
from .swaggerParams import *

from home.api.v1.serializers import (
    SignupSerializer,
    UserSerializer,
    ContactUsSerializer,
    HorseImagesSerializer,
    HorsesSerializer,
    KeywordsSerializer,
    FavouriteSerializer
)
from home.models import (
    ContactUs,
    Keywords,
    HorseImages,
    Horses,
    Favourite
)


deleted_message = "Successfully Deleted"

class SignupViewSet(ModelViewSet):
    serializer_class = SignupSerializer
    http_method_names = ["post"]

class LoginViewSet(ViewSet):
    """Based on rest_framework.authtoken.views.ObtainAuthToken"""

    serializer_class = AuthTokenSerializer

    def create(self, request):
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        token, created = Token.objects.get_or_create(user=user)
        user_serializer = UserSerializer(user)
        return Response({"token": token.key, "user": user_serializer.data})
    
    

@swagger_auto_schema(method='get',responses={200: ContactUsSerializer(many=True)})
@swagger_auto_schema(method='post', request_body=ContactUsSerializer)
@api_view(['GET','POST'])
@permission_classes([AllowAny])
@authentication_classes([TokenAuthentication])
def ContactUsView(request):
    if request.method == 'GET':
        if request.user.is_authenticated and request.user.is_superuser:
            contact_us_obj = ContactUs.objects.all()
            serializer = ContactUsSerializer(contact_us_obj,many=True)
            return Response(data=serializer.data,status=status.HTTP_200_OK)
        
        data = {
            "status":"Error",
            "message":"Unauthorized",
        }
        return Response(data=data,status=status.HTTP_401_UNAUTHORIZED)
    
    if request.method == 'POST':
        serializer = ContactUsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data,status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


@swagger_auto_schema(method='get',responses={200: TermAndConditionSerializer(many=True)})
@swagger_auto_schema(method='post', request_body=TermAndConditionSerializer)
@api_view(['GET','POST'])
@permission_classes([AllowAny])
@authentication_classes([TokenAuthentication])
def termAndConditionView(request):
    if request.method == 'GET':
        queryset = TermAndCondition.objects.filter(is_active=True).order_by('-updated_at')[0:1]
        serializer = TermAndConditionSerializer(queryset,many=True)
        return Response(data=serializer.data,status=status.HTTP_200_OK)
    
    if request.method == 'POST':
        if request.user.is_authenticated and request.user.is_superuser:
            serializer = TermAndConditionSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(data=serializer.data,status=status.HTTP_200_OK)
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        
        
        data = {
            "status":"Error",
            "message":"Unauthorized",
        }
        return Response(data=data,status=status.HTTP_401_UNAUTHORIZED)
    


@swagger_auto_schema(method='get',manual_parameters=[horse_images_get_param],responses={200:HorseImagesSerializer(many=True)})
@swagger_auto_schema(method='post', request_body=HorseImagesSerializer)
@swagger_auto_schema(method='delete',manual_parameters=[horse_images_delete_param],responses=customDeleteResponse())
@api_view(['GET','POST','DELETE'])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def HorseImagesView(request):
    if request.method == 'GET':
        horse_id = request.GET.get('horse-id',None)
        if horse_id is None:
            data={
                "status":"ERROR",
                "message":"horse-id is required"
            }
            return Response(data=data,status=status.HTTP_404_NOT_FOUND)
        try:
            horse = Horses.objects.get(id=horse_id)
        except:
            data={
                "status":"ERROR",
                "message":"Invalid Horse id"
            }
            return Response(data=data,status=status.HTTP_404_NOT_FOUND)
        
        serializer = HorseImagesSerializer(data=horse.images,many=True)
        return Response(data=serializer.data,status=status.HTTP_200_OK)
    
    if request.method == 'POST':
        serializer = HorseImagesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data,status=status.HTTP_201_CREATED)

        return Response(data=serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == 'DELETE':
        image_id = request.POST.get('image-id',None)
        if image_id is None:
            data={
                "status":"ERROR",
                "message":"image-id is required"
            }
            return Response(data=data,status=status.HTTP_404_NOT_FOUND)
        
        try:
            image = HorseImages.objects.get(id=image_id)
        except:
            data={
                "status":"ERROR",
                "message":"Invalid image-id"
            }
            return Response(data=data,status=status.HTTP_404_NOT_FOUND)
        image.delete()
        data = {
        "status":"OK",
        "message":deleted_message,
        }
        return Response(data=data,status=status.HTTP_200_OK)
    


@swagger_auto_schema(method='get',manual_parameters=[horse_keyword_get_param],responses={200:KeywordsSerializer(many=True)})
@swagger_auto_schema(method='post', request_body=KeywordsSerializer)
@swagger_auto_schema(method='put', manual_parameters=[horse_keyword_get_param,horse_keyword_put_param],responses={200:KeywordsSerializer})
@swagger_auto_schema(method='delete',manual_parameters=[horse_images_delete_param],responses=customDeleteResponse())
@api_view(['GET','POST','PUT','DELETE'])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def KeywordsView(request):
    if request.method == 'GET':
        horse_id = request.GET.get('horse-id',None)
        if horse_id is None:
            data={
                "status":"ERROR",
                "message":"horse-id is required"
            }
            return Response(data=data,status=status.HTTP_404_NOT_FOUND)
        try:
            horse = Horses.objects.get(id=horse_id)
        except:
            data={
                "status":"ERROR",
                "message":"Invalid Horse id"
            }
            return Response(data=data,status=status.HTTP_404_NOT_FOUND)
        
        serializer = KeywordsSerializer(data=horse.keywords,many=True)
        return Response(data=serializer.data,status=status.HTTP_200_OK)
    
    if request.method == 'POST':
        serializer = KeywordsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data,status=status.HTTP_201_CREATED)

        return Response(data=serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    if request.method == 'PUT':
        keyword_id = request.POST.get('keyword-id',None)
        if keyword_id is None:
            data={
                "status":"ERROR",
                "message":"keyword-id is required"
            }
            return Response(data=data,status=status.HTTP_404_NOT_FOUND)
        
        try:
            keyword = Keywords.objects.get(id=keyword_id)
        except:
            data={
                "status":"ERROR",
                "message":"Invalid keyword-id"
            }
            return Response(data=data,status=status.HTTP_404_NOT_FOUND)
        
        serializer = KeywordsSerializer(keyword,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data,status=status.HTTP_200_OK)
        return Response(data=serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    if request.method == 'DELETE':
        keyword_id = request.POST.get('keyword-id',None)
        if keyword_id is None:
            data={
                "status":"ERROR",
                "message":"keyword-id is required"
            }
            return Response(data=data,status=status.HTTP_404_NOT_FOUND)
        
        try:
            keyword = Keywords.objects.get(id=keyword_id)
        except:
            data={
                "status":"ERROR",
                "message":"Invalid keyword-id"
            }
            return Response(data=data,status=status.HTTP_404_NOT_FOUND)
        keyword.delete()
        data = {
        "status":"OK",
        "message":deleted_message,
        }
        return Response(data=data,status=status.HTTP_200_OK)
    

@swagger_auto_schema(method='get',manual_parameters=[horse_get_param],responses={200:HorsesSerializer(many=True)})
@swagger_auto_schema(method='post', request_body=HorsesSerializer)
@swagger_auto_schema(method='put', manual_parameters=[horse_get_param],responses={200:HorsesSerializer})
@swagger_auto_schema(method='delete',manual_parameters=[horse_images_delete_param],responses=customDeleteResponse())
@api_view(['GET','POST','PUT','DELETE'])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def HorseView(request):
    if request.method == 'GET':
        horse_id = request.GET.get('horse-id',None)
        if horse_id is None:
            horses = Horses.objects.filter(uploaded_by=request.user).order_by('id').reverse()
            
            serializer = HorsesSerializer(horses,many=True)
            return Response(data=serializer.data,status=status.HTTP_200_OK)
        try:
            horse = Horses.objects.get(id=horse_id)
        except:
            data={
                "status":"ERROR",
                "message":"Invalid Horse id"
            }
            return Response(data=data,status=status.HTTP_404_NOT_FOUND)

        serializer = HorsesSerializer(data=horse)
        return Response(data=serializer.data,status=status.HTTP_200_OK)
    
    if request.method == 'POST':
        serializer = HorsesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(uploaded_by=request.user)
            return Response(data=serializer.data,status=status.HTTP_200_OK)
        return Response(data=serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == 'PUT':
        horse_id = request.GET.get('horse-id',None)
        if horse_id is None:
            data={
                "status":"ERROR",
                "message":"horse-id is required"
            }
            return Response(data=data,status=status.HTTP_404_NOT_FOUND)
        
        try:
            horse = Horses.objects.get(id=horse_id)
        except:
            data={
                "status":"ERROR",
                "message":"Invalid Horse id"
            }
            return Response(data=data,status=status.HTTP_404_NOT_FOUND)
        
        serializer = HorsesSerializer(horse,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data,status=status.HTTP_200_OK)
        return Response(data=serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == 'DELETE':
        horse_id = request.POST.get('horse-id',None)
        if horse_id is None:
            data={
                "status":"ERROR",
                "message":"horse-id is required"
            }
            return Response(data=data,status=status.HTTP_404_NOT_FOUND)
        
        try:
            horse = Horses.objects.get(id=horse_id)
        except:
            data={
                "status":"ERROR",
                "message":"Invalid horse-id"
            }
            return Response(data=data,status=status.HTTP_404_NOT_FOUND)
        horse.delete()
        data = {
        "status":"OK",
        "message":deleted_message,
        }
        return Response(data=data,status=status.HTTP_200_OK)
    
    

@swagger_auto_schema(method='get',responses={200:FavouriteSerializer(many=True)})
@swagger_auto_schema(method='post', request_body=FavouriteSerializer)
@swagger_auto_schema(method='put', manual_parameters=[favourite_put_param],responses={200:FavouriteSerializer})
@swagger_auto_schema(method='delete',manual_parameters=[horse_images_delete_param],responses=customDeleteResponse())
@api_view(['GET','POST','PUT','DELETE'])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def favouriteView(request):
    if request.method == 'GET':
        instance = Favourite.objects.filter(user=request.user)
        serializer = FavouriteSerializer(instance)
        return Response(data=serializer.data,status=status.HTTP_200_OK)
    
    if request.method == 'POST':
        serializer = FavouriteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            data={
                "status":"OK",
                "message":"Successfull",
                "data":serializer.data
            }
            
            return Response(data=data,status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors,status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'PUT':
        favourite_id = request.GET.get('favourite-id',None)
        if favourite_id is None:
            data = {
                "status":"error",
                "message":"favourite-id is required"
            }
            return Response(data=data,status=status.HTTP_404_NOT_FOUND)
        try:
            instance = Favourite.objects.get(id=favourite_id)
        except:
            data = {
                "status":"error",
                "message":"Invalid favourite-id"
            }
            return Response(data=data,status=status.HTTP_404_NOT_FOUND)
        
        serializer = FavouriteSerializer(instance,data=request.data)
        if serializer.is_valid():
            serializer.save()
            data={
                "status":"OK",
                "message":"Successfull",
                "data":serializer.data
            }
            
            return Response(data=data,status=status.HTTP_200_OK)
        return Response(data=serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == 'DELETE':
        favourite_id = request.GET.get('favourite-id',None)
        if favourite_id is None:
            data = {
                "status":"error",
                "message":"favourite-id is required"
            }
            return Response(data=data,status=status.HTTP_404_NOT_FOUND)
        try:
            instance = Favourite.objects.get(id=favourite_id)
        except:
            data = {
                "status":"error",
                "message":"Invalid favourite-id"
            }
            return Response(data=data,status=status.HTTP_404_NOT_FOUND)

        instance.delete()
        data = {
                "status":"ok",
                "message":deleted_message
            }
        return Response(data=data,status=status.HTTP_200_OK)