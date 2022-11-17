from drf_yasg import openapi
from rest_framework import status
from drf_yasg.openapi import Schema, TYPE_OBJECT, TYPE_STRING, TYPE_ARRAY

deleted_message = "Successfully Deleted"

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


def createBoolParam(paramName, description, required=False):
    return openapi.Parameter(
        paramName,
        openapi.IN_QUERY,
        description=description,
        type=openapi.TYPE_BOOLEAN,
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


def customOtpResponse():
    responses = {
        status.HTTP_200_OK: Schema(
            type=TYPE_OBJECT,
            properties={
                "status": openapi.Schema(
                    title="OK",
                    type=openapi.TYPE_STRING,
                ),
                "token": openapi.Schema(
                    title="authorized token",
                    type=openapi.TYPE_STRING,
                ),
                "message": openapi.Schema(
                    title="email verified",
                    type=openapi.TYPE_STRING,
                ),
            },
        )
    }
    return responses


def customSendOtpResponse():
    responses = {
        status.HTTP_200_OK: Schema(
            type=TYPE_OBJECT,
            properties={
                "status": openapi.Schema(
                    title="OK",
                    type=openapi.TYPE_STRING,
                ),
                "token": openapi.Schema(
                    title="token",
                    type=openapi.TYPE_STRING,
                ),
                "message": openapi.Schema(
                    title="OTP is sended to registered email",
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


def customPassowrdResetResponse():
    responses = {
        status.HTTP_200_OK: Schema(
            type=TYPE_OBJECT,
            properties={
                "status": openapi.Schema(
                    title="OK",
                    type=openapi.TYPE_STRING,
                ),
                "message": openapi.Schema(
                    title="OTP is sended to registered email",
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


def customPasswordResetResponse():
    responses = {
        status.HTTP_200_OK: Schema(
            type=TYPE_OBJECT,
            properties={
                "status": openapi.Schema(
                    title="OK",
                    type=openapi.TYPE_STRING,
                ),
                "message": openapi.Schema(
                    title="Password Reset Successfullly!",
                    type=openapi.TYPE_STRING,
                ),
            },
        )
    }
    return responses


def customSetupIntentResponse():
    responses = {
        status.HTTP_200_OK: Schema(
            type=TYPE_OBJECT,
            properties={
                "status": openapi.Schema(
                    title="OK",
                    type=openapi.TYPE_STRING,
                ),
                "setupIntent": openapi.Schema(
                    title="setup-intent-secret",
                    type=openapi.TYPE_STRING,
                ),
                "ephemeralKey": openapi.Schema(
                    title="ephemeralKey",
                    type=openapi.TYPE_STRING,
                ),
                "customer": openapi.Schema(
                    title="customer",
                    type=openapi.TYPE_STRING,
                ),
                "publish_key": openapi.Schema(
                    title="publish_key",
                    type=openapi.TYPE_STRING,
                ),
            },
        )
    }
    return responses
