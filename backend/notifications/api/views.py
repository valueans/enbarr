from home.api.v1.swaggerParams import *
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from home.helpers import getPagination
from .serializers import *

from rest_framework.decorators import (
    api_view,
    permission_classes,
    authentication_classes,
)


@swagger_auto_schema(method="get", responses={200: NotificationsSerializer(many=True)})
@swagger_auto_schema(method="post", request_body=NotificationsSerializer)
@swagger_auto_schema(
    method="put",
    manual_parameters=[
        createParam(
            paramName="notification-id",
            description="to update the status of notification",
        )
    ],
    responses={200: NotificationsSerializer},
)
@swagger_auto_schema(
    method="delete",
    manual_parameters=[
        createParam(paramName="notification-id", description="to delete notification")
    ],
    responses=customDeleteResponse(),
)
@api_view(["GET", "POST", "PUT", "DELETE"])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def notificationsView(request):
    if request.method == "GET":
        instance = (
            Notifications.objects.filter(user=request.user).order_by("id").reverse()
        )
        return getPagination(instance, request, NotificationsSerializer)
    if request.method == "POST":
        serializer = NotificationsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == "PUT":
        notification_id = request.GET.get("notification-id", None)
        if notification_id is None:
            data = {"status": "error", "message": "notification-id is required"}
            return Response(data=data, status=status.HTTP_404_NOT_FOUND)
        try:
            notification_id = notification_id.split(",")
            instance = Notifications.objects.filter(id__in=notification_id)
            instance.update(read_status=True)
        except:
            data = {"status": "error", "message": "Invalid notification-id"}
            return Response(data=data, status=status.HTTP_404_NOT_FOUND)

        data = {"status": "success", "message": "successfully updated"}
        return Response(data=data, status=status.HTTP_200_OK)

    if request.method == "DELETE":
        notification_id = request.GET.get("notification-id", None)
        if notification_id is None:
            data = {"status": "error", "message": "notification-id is required"}
            return Response(data=data, status=status.HTTP_404_NOT_FOUND)
        try:
            instance = Notifications.objects.get(id=notification_id)
        except:
            data = {"status": "error", "message": "Invalid notification-id"}
            return Response(data=data, status=status.HTTP_404_NOT_FOUND)
        instance.delete()
        data = {"status": "ok", "message": deleted_message}
        return Response(data=data, status=status.HTTP_200_OK)


@swagger_auto_schema(
    method="post",
    responses=customSuccessfullResponse(),
)
@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def readAllnotificationView(request):
    if request.method == "POST":
        instances = Notifications.objects.filter(user=request.user)
        instances.update(read_status=True)
        data = {"status": "ok", "message": "successfull"}
        return Response(data=data, status=status.HTTP_200_OK)
    
    
@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def unreadAllnotificationView(request):
    if request.method == "GET":
        instances = Notifications.objects.filter(user=request.user,read_status=False).count()
        data = {"status": "ok", "message": "successfull","count":instances}
        return Response(data=data, status=status.HTTP_200_OK)
