from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework import status
from django.db.models import Q
from drf_yasg.utils import swagger_auto_schema
from .serializers import ConversationSerializer
from chat.models import Messages, Conversation
from datetime import datetime
from home.helpers import getPagination
from django.contrib.auth import get_user_model
from django.http import HttpResponse
from notifications.onesignal_service import sendMessageNotification
from chat.pubnub_service import unsubcribeChannel
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
        receiver_id = request.GET.get("receiver-id", None)
        if receiver_id is None:
            instance = (
                Conversation.objects.filter(
                    Q(user_one=request.user) | Q(user_two=request.user)
                )
                .order_by("updated_at")
                .reverse()
            )
            return getPagination(instance, request, ConversationSerializer)
        else:
            try:
                receiver = User.objects.get(id=receiver_id)
            except:
                data = {"status": "error", "message": "Invalid receiver id"}
                return Response(data=data, status=status.HTTP_404_NOT_FOUND)
            try:
                instance = Conversation.objects.get(
                    Q(user_one=request.user) & Q(user_two=receiver)
                    | Q(user_one=receiver) & Q(user_two=request.user)
                )
            except:
                channel = f"channel-chat-{request.user.id}-{receiver.id}"
                instance = Conversation.objects.create(
                    user_one=request.user,
                    user_two=receiver,
                    channel=channel,
                    updated_at=datetime.now(),
                )
        serializer = ConversationSerializer(instance, context={"request": request})
        data = {"status": "ok", "message": "successfull", "data": serializer.data}
        return Response(data=data, status=status.HTTP_200_OK)

    if request.method == "DELETE":
        conversation_id = request.GET.get("conversation-id", None)
        if conversation_id is None:
            data = {"status": "ERROR", "message": "conversation-id is required"}
            return Response(data=data, status=status.HTTP_404_NOT_FOUND)

        try:
            instance = Conversation.objects.get(id=conversation_id)
            if request.user.id == instance.user_one.id:
                unsubcribeChannel(instance.channel, instance.user_one.email)
            else:
                unsubcribeChannel(instance.channel, instance.user_two.email)

        except:
            data = {"status": "ERROR", "message": "Invalid conversation-id"}
            return Response(data=data, status=status.HTTP_404_NOT_FOUND)
        try:
            instance.last_message.delete()
        except:
            pass
        instance.delete()
        data = {"status": "OK", "message": deleted_message}
        return Response(data=data, status=status.HTTP_200_OK)


import json


@api_view(["POST"])
def pubnub_webhook(request):
    body = json.loads(request.body)
    channel = body["event"]["channel"]
    message = body["event"]["eventPayload"]["message"]["text"]
    sender = body["event"]["senderId"]
    conversation = Conversation.objects.get(channel=channel)
    try:
        prev_messages = Messages.objects.filter(channel=channel)
        prev_messages.delete()
    except:
        pass

    message_obj = Messages.objects.create(channel=channel, Messages=message)
    conversation.last_message = message_obj
    conversation.save()
    if conversation.user_one.email == sender:
        sendMessageNotification(conversation.user_two, message, conversation.user_one)
    else:
        sendMessageNotification(conversation.user_one, message, conversation.user_two)

    return HttpResponse(200)
