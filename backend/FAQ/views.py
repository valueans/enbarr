from drf_yasg.utils import swagger_auto_schema
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .serializers import *
from .models import *
from rest_framework import status
from rest_framework.decorators import permission_classes, api_view


@swagger_auto_schema(method="GET", responses={200: FAQSerializer(many=True)})
@api_view(["GET"])
@permission_classes([AllowAny])
def faqView(request):
    obj = FAQ.objects.all()
    serializer = FAQSerializer(obj, many=True)
    return Response(data=serializer.data, status=status.HTTP_200_OK)