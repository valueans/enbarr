from drf_yasg import openapi
from rest_framework import status
from drf_yasg.openapi import Schema, TYPE_OBJECT, TYPE_STRING, TYPE_ARRAY
from .serializers import HorseImagesSerializer

favourite_put_param = openapi.Parameter(
    "favourite-id",
    openapi.IN_QUERY,
    description="to update specific favourite",
    type=openapi.TYPE_INTEGER,
    require=False,
)


def createParam(paramName, description, required=False):
    return openapi.Parameter(
        paramName,
        openapi.IN_QUERY,
        description=description,
        type=openapi.TYPE_INTEGER,
        required=required,
    )


def createParamList(paramName, description, required=False):
    return openapi.Parameter(
        paramName,
        openapi.IN_QUERY,
        description=description,
        type=openapi.TYPE_ARRAY,
        items=openapi.Items(type=openapi.TYPE_STRING),
        required=required,
    )


def customDeleteResponse():
    responses = {
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
            },
        )
    }
    return responses


def customLikeResponse():
    responses = {
        status.HTTP_200_OK: Schema(
            type=TYPE_OBJECT,
            properties={
                "status": openapi.Schema(
                    title="OK",
                    type=openapi.TYPE_STRING,
                ),
                "message": openapi.Schema(
                    title="Successfull",
                    type=openapi.TYPE_STRING,
                ),
                "likes": openapi.Schema(
                    title="likes-count",
                    type=openapi.TYPE_INTEGER,
                ),
            },
        )
    }
    return responses


def customDisLikeResponse():
    responses = {
        status.HTTP_200_OK: Schema(
            type=TYPE_OBJECT,
            properties={
                "status": openapi.Schema(
                    title="OK",
                    type=openapi.TYPE_STRING,
                ),
                "message": openapi.Schema(
                    title="Successfull",
                    type=openapi.TYPE_STRING,
                ),
                "dislikes": openapi.Schema(
                    title="dislikes-count",
                    type=openapi.TYPE_INTEGER,
                ),
            },
        )
    }
    return responses
