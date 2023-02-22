from drf_yasg.utils import swagger_auto_schema
from .serializers import FeedBackSerializer
from feedback.models import FeedBack
from home.api.v1.swaggerParams import *
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework import status
from rest_framework.decorators import (
    api_view,
    permission_classes,
    authentication_classes,
)


@swagger_auto_schema(method="GET", responses={200: FeedBackSerializer(many=True)})
@swagger_auto_schema(method="POST", request_body=FeedBackSerializer)
@swagger_auto_schema(
    method="PUT",
    manual_parameters=[
        createParam(paramName="feedback-id", description="to update specific feedback")
    ],
    request_body=FeedBackSerializer,
    responses={200: FeedBackSerializer()},
)
@swagger_auto_schema(
    method="DELETE",
    manual_parameters=[
        createParam(paramName="feedback-id", description="to delete specific feedback")
    ],
    responses=customDeleteResponse(),
)
@api_view(["GET", "POST", "PUT", "DELETE"])
def feedBackView(request):
    if request.method == "GET":
        feedback = FeedBack.objects.all()
        serializer = FeedBackSerializer(feedback, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
    if request.method == "POST":
        serializer = FeedBackSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    if request.method == "PUT":
        feed_back_id = request.GET.get("feedback-id", None)
        if feed_back_id is None:
            data = {"status": "ERROR", "message": "feedback-id is required"}
            return Response(data=data, status=status.HTTP_404_NOT_FOUND)
        try:
            feedback = FeedBack.objects.get(id=feed_back_id)
        except:
            data = {"status": "ERROR", "message": "invalid feedback-id"}
            return Response(data=data, status=status.HTTP_404_NOT_FOUND)
        serializer = FeedBackSerializer(feedback, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == "DELETE":
        feed_back_id = request.GET.get("feedback-id", None)
        if feed_back_id is None:
            data = {"status": "ERROR", "message": "feedback-id is required"}
            return Response(data=data, status=status.HTTP_404_NOT_FOUND)
        try:
            feedback = FeedBack.objects.get(id=feed_back_id)
        except:
            data = {"status": "ERROR", "message": "invalid feedback-id"}
            return Response(data=data, status=status.HTTP_404_NOT_FOUND)
        feedback.delete()
        data = {"status": "OK", "message": deleted_message}
        return Response(data=data, status=status.HTTP_200_OK)
