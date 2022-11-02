from home.api.v1.swaggerParams import *
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
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
        serializer = NotificationsSerializer(instance, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
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
            instance = Notifications.objects.get(id=notification_id)
        except:
            data = {"status": "error", "message": "Invalid plan-id"}
            return Response(data=data, status=status.HTTP_404_NOT_FOUND)

        serializer = NotificationsSerializer(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == "DELETE":
        notification_id = request.GET.get("notification-id", None)
        if notification_id is None:
            data = {"status": "error", "message": "notification-id is required"}
            return Response(data=data, status=status.HTTP_404_NOT_FOUND)
        try:
            instance = Notifications.objects.get(id=notification_id)
        except:
            data = {"status": "error", "message": "Invalid plan-id"}
            return Response(data=data, status=status.HTTP_404_NOT_FOUND)
        instance.delete()
        data = {"status": "ok", "message": deleted_message}
        return Response(data=data, status=status.HTTP_200_OK)
