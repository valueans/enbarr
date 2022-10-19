from drf_yasg import openapi
from rest_framework import status
from drf_yasg.openapi import Schema, TYPE_OBJECT, TYPE_STRING, TYPE_ARRAY
from .serializers import HorseImagesSerializer

horse_images_get_param = openapi.Parameter('horse-id', openapi.IN_QUERY, description="to get all horse images", type=openapi.TYPE_INTEGER)
horse_images_delete_param = openapi.Parameter('image-id', openapi.IN_QUERY, description="to delete  a specific image from a horse post", type=openapi.TYPE_INTEGER)
horse_keyword_get_param = openapi.Parameter('horse-id', openapi.IN_QUERY, description="to get all horse keywords", type=openapi.TYPE_INTEGER)
horse_keyword_put_param = openapi.Parameter('keyword-id', openapi.IN_QUERY, description="to get keywords", type=openapi.TYPE_INTEGER)
horse_get_param = openapi.Parameter('horse-id', openapi.IN_QUERY, description="to get specific horse\nleave empty if you want all horses", type=openapi.TYPE_INTEGER,require=False)
favourite_put_param = openapi.Parameter('favourite-id', openapi.IN_QUERY, description="to update specific favourite", type=openapi.TYPE_INTEGER,require=False)




def customDeleteResponse():
    responses={
    status.HTTP_200_OK: Schema(
        type=TYPE_OBJECT,
        properties={
            "status": openapi.Schema(
                title="OK",
                type=openapi.TYPE_STRING,
            ),
            "message": openapi.Schema(
                title="Successfully Deleted",
                type=openapi.TYPE_STRING,
            ),
        }
    )
    }
    return responses