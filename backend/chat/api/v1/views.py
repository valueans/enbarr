from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authentication import TokenAuthentication
from rest_framework import status
from django.db.models import Q
from drf_yasg.utils import swagger_auto_schema
from .serializers import MessagesSerializer, ConversationSerializer
from chat.models import Messages, Conversation
from datetime import datetime
from home.helpers import getPagination
from chat.pubnub_service import sendMessage, subcribeChannel
from django.contrib.auth import get_user_model
from django.http import HttpResponse
from notifications.onesignal_service import sendMessageNotification
from rest_framework.decorators import (
    api_view,
    permission_classes,
    authentication_classes,
)
from home.api.v1.swaggerParams import (
    createParam,
    customDeleteResponse,
    deleted_message,
)


User = get_user_model()


@swagger_auto_schema(method="post", request_body=MessagesSerializer)
@swagger_auto_schema(
    method="delete",
    manual_parameters=[
        createParam(paramName="message-id", description="to delete message")
    ],
    responses=customDeleteResponse(),
)
@api_view(["POST", "DELETE"])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def messagesView(request):
    if request.method == "POST":
        receiver = request.POST.get("receiver", None)
        message = request.POST.get("message", None)
        if receiver is None or message is None:
            data = {"status": "error", "message": "receiver & message is required"}
            return Response(data=data, status=status.HTTP_404_NOT_FOUND)
        try:
            receiver = User.objects.get(id=receiver)
        except:
            data = {"status": "error", "message": "Invalid receiver"}
            return Response(data=data, status=status.HTTP_404_NOT_FOUND)
        try:
            conversation_instance = Conversation.objects.get(
                Q(user_one=request.user) & Q(user_two=receiver)
                | Q(user_one=receiver) & Q(user_two=request.user)
            )
        except:
            channel = f"chat.{request.user.id}{receiver.id}"
            conversation_instance = Conversation.objects.create(
                user_one=request.user,
                user_two=receiver,
                channel=channel,
                updated_at=datetime.now(),
            )
            subcribeChannel(channel, receiver.id)
        sendMessage(conversation_instance.channel, request.user.id, message)
        sendMessageNotification(receiver, message, request.user)
        data = {"status": "ok", "message": "message successfully sent"}
        return Response(data=data, status=status.HTTP_200_OK)
    if request.method == "DELETE":
        message_id = request.GET.get("message-id", None)
        if message_id is None:
            data = {"status": "ERROR", "message": "message-id is required"}
            return Response(data=data, status=status.HTTP_404_NOT_FOUND)
        try:
            message = Messages.objects.get(id=message_id)
        except:
            data = {"status": "ERROR", "message": "Invalid message-id"}
            return Response(data=data, status=status.HTTP_404_NOT_FOUND)
        message.delete()

        data = {"status": "OK", "message": deleted_message}
        return Response(data=data, status=status.HTTP_200_OK)


@swagger_auto_schema(
    method="get",
    manual_parameters=[
        createParam(
            paramName="conversation-id", description="to get specific conversation"
        )
    ],
    responses={200: ConversationSerializer(many=True)},
)
@swagger_auto_schema(
    method="delete",
    manual_parameters=[
        createParam(
            paramName="conversation-id",
            description="to delete specific conversation",
            required=True,
        )
    ],
    responses=customDeleteResponse(),
)
@api_view(["GET", "DELETE"])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def conversationView(request):
    if request.method == "GET":
        conversation_id = request.GET.get("conversation-id", None)
        if conversation_id is None:
            intance = (
                Conversation.objects.filter(
                    Q(user_one=request.user) | Q(user_two=request.user)
                )
                .order_by("updated_at")
                .reverse()
            )
            return getPagination(intance, request, ConversationSerializer)
        try:
            intance = Conversation.objects.get(id=conversation_id)
        except:
            data = {"status": "error", "message": "Invalid conversation-id"}
            return Response(data=data, status=status.HTTP_404_NOT_FOUND)
        serializer = ConversationSerializer(intance)
        data = {"status": "ok", "message": "successfull", "data": serializer.data}
        return Response(data=data, status=status.HTTP_200_OK)
    if request.method == "DELETE":
        conversation_id = request.GET.get("conversation-id", None)
        if conversation_id is None:
            data = {"status": "ERROR", "message": "conversation-id is required"}
            return Response(data=data, status=status.HTTP_404_NOT_FOUND)

        try:
            instance = Conversation.objects.get(id=conversation_id)
        except:
            data = {"status": "ERROR", "message": "Invalid conversation-id"}
            return Response(data=data, status=status.HTTP_404_NOT_FOUND)
        messages = instance.message.all()
        messages.delete()
        instance.delete()
        data = {"status": "OK", "message": deleted_message}
        return Response(data=data, status=status.HTTP_200_OK)


import json


@api_view(["POST"])
def pubnub_webhook(request):
    body = json.loads(request.body)
    channel = body["event"]["channel"]
    timetoken = body["event"]["timetoken"]
    message = Messages.objects.create(message_timestamp=timetoken)
    conversation = Conversation.objects.get(channel=channel)
    conversation.message.add(message)
    conversation.save()
    return HttpResponse(200)
