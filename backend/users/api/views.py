from home.api.v1.swaggerParams import *
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authentication import TokenAuthentication
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from .serializers import *
from users.models import DeletedUsers
from users.helpers import sendOtpEmail, verifyOtp
from rest_framework.viewsets import ModelViewSet, ViewSet
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from allauth.socialaccount.providers.apple.views import AppleOAuth2Adapter
from allauth.socialaccount.providers.apple.client import AppleOAuth2Client
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.authtoken.models import Token
from rest_auth.registration.views import SocialLoginView
from rest_auth.registration.serializers import SocialLoginSerializer


from rest_framework.decorators import (
    api_view,
    permission_classes,
    authentication_classes,
)


class SignupViewSet(ModelViewSet):
    """
    # Request
    {
        "username":"email",
        "password":"password"
    }
    # 200 Response{
        "token": <auth_token>,
        "user" : user_details,
    }
    """

    serializer_class = SignupSerializer
    http_method_names = ["post"]

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        user = User.objects.get(id=response.data["id"])
        user_serializer = UserSerializer(user)
        token, created = Token.objects.get_or_create(user=user)
        data = {"token": token.key, "user": user_serializer.data}
        return Response(data=data, status=status.HTTP_200_OK)


class LoginViewSet(ViewSet):
    """
    # Request
    {
        "username":"email",
        "password":"password"
    }
    # 200 Response if user not verified{
        "status":"ERROR",
        "token": <auth_token>,
        "user" : user_details,
        "message": "otp sended"
    }
    # 200 Response if user verified{
        "token": <auth_token>,
        "user" : user_details
    }
    """

    serializer_class = AuthTokenSerializer

    def create(self, request):
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        token, created = Token.objects.get_or_create(user=user)
        user_serializer = UserSerializer(user)
        if user.is_verified == True:
            return Response(
                {"token": token.key, "user": user_serializer.data},
                status=status.HTTP_200_OK,
            )

        sendOtpEmail(user)
        data = {
            "token": token.key,
            "user": user_serializer.data,
        }

        return Response(data=data, status=status.HTTP_200_OK)


class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter
    serializer_class = SocialLoginSerializer
    callback_url = "http://localhost:8000/"
    client_class = OAuth2Client

    def get_serializer(self, *args, **kwargs):
        serializer_class = self.get_serializer_class()
        kwargs["context"] = self.get_serializer_context()
        return serializer_class(*args, **kwargs)


class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    serializer_class = SocialLoginSerializer
    callback_url = "http://localhost:8000/"
    client_class = OAuth2Client

    def get_serializer(self, *args, **kwargs):
        serializer_class = self.get_serializer_class()
        kwargs["context"] = self.get_serializer_context()
        return serializer_class(*args, **kwargs)


class AppleLogin(SocialLoginView):
    adapter_class = AppleOAuth2Adapter
    callback_url = "http://localhost:8000/"
    client_class = AppleOAuth2Client
    serializer_class = SocialLoginSerializer


@swagger_auto_schema(method="get", responses=customOtpResponse())
@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def verifyOtpView(request):
    if request.method == "GET":
        otp = request.GET.get("otp", None)
        if otp is None:
            data = {"status": "ERROR", "message": "otp is required for verification"}
            return Response(data=data, status=status.HTTP_404_NOT_FOUND)

        user = request.user
        verify = verifyOtp(user, otp)
        print(verify)

        if verify == True:
            token = Token.objects.get(user=user)
            data = {"status": "OK", "token": token.key, "message": "email verified"}
            return Response(data=data, status=status.HTTP_200_OK)

        data = {"status": "ERROR", "message": "Invalid OTP"}
        return Response(data=data, status=status.HTTP_400_BAD_REQUEST)


@swagger_auto_schema(method="get", responses=customSendOtpResponse())
@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def sendOtpView(request):
    if request.method == "GET":
        user = request.user
        sendOtpEmail(user)
        data = {"status": "OK", "message": "OTP is sended to registered email"}
        return Response(data=data, status=status.HTTP_200_OK)


@swagger_auto_schema(
    method="get",
    manual_parameters=[
        createParam(
            paramName="email",
            description="to check that user is register with this email and send the otp",
        )
    ],
    responses=customSendOtpResponse(),
)
@api_view(["GET"])
def resetEmailView(request):
    if request.method == "GET":
        email = request.GET.get("email", None)
        if email is None:
            data = {"status": "ERROR", "message": "email is required"}
            return Response(data=data, status=status.HTTP_404_NOT_FOUND)
        try:
            user = User.objects.get(email=email)
        except:
            data = {"status": "ERROR", "message": "invalid email address"}
            return Response(data=data, status=status.HTTP_404_NOT_FOUND)

        sendOtpEmail(user)
        token, created = Token.objects.get_or_create(user=user)
        data = {
            "status": "OK",
            "token": token.key,
            "message": "OTP is sended to registered email",
        }
        return Response(data=data, status=status.HTTP_200_OK)


@swagger_auto_schema(
    method="post",
    operation_description="you need to pass password1 and password2 along with the token in the header.",
    responses=customPasswordResetResponse(),
)
@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def resetPasswordView(request):
    if request.method == "POST":
        password1 = request.POST.get("password1", None)
        password2 = request.POST.get("password2", None)

        if password1 is None or password2 is None:
            data = {"status": "ERROR", "message": "password1 and password2 is required"}
            return Response(data=data, status=status.HTTP_404_NOT_FOUND)

        if password1 != password2:
            data = {
                "status": "ERROR",
                "message": "password1 and password2 should be same",
            }
            return Response(data=data, status=status.HTTP_400_BAD_REQUEST)

        if len(password1) < 8:
            data = {
                "status": "ERROR",
                "message": "password should be minimum of 8 characters.",
            }
            return Response(data=data, status=status.HTTP_400_BAD_REQUEST)

        user = request.user
        user.set_password(password1)
        user.save()

        data = {"status": "OK", "message": "Password Reset Successfullly!"}
        return Response(data=data, status=status.HTTP_200_OK)


@swagger_auto_schema(method="get", responses={200: UserProfileSerializer})
@swagger_auto_schema(method="post", request_body=UserProfileSerializer)
@swagger_auto_schema(method="put", responses={200: UserProfileSerializer})
@swagger_auto_schema(method="delete", responses=customDeleteResponse())
@api_view(["GET", "POST", "PUT", "DELETE"])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def userProfileView(request):
    if request.method == "GET":
        try:
            instance = UserProfile.objects.get(user=request.user)
        except:
            return Response(data=[], status=status.HTTP_200_OK)

        serializer = UserProfileSerializer(instance)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    if request.method == "POST":
        try:
            instance = UserProfile.objects.get(user=request.user)
            serializer = UserProfileSerializer(instance, data=request.data)
        except:
            serializer = UserProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == "PUT":
        try:
            instance = UserProfile.objects.get(user=request.user)
            serializer = UserProfileSerializer(instance, data=request.data)
        except:
            serializer = UserProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == "DELETE":
        try:
            instance = UserProfile.objects.get(user=request.user)
        except:
            data = {"status": "error", "message": "Invalid favourite-id"}
            return Response(data=data, status=status.HTTP_404_NOT_FOUND)
        instance.delete()
        data = {"status": "ok", "message": deleted_message}
        return Response(data=data, status=status.HTTP_200_OK)


@swagger_auto_schema(method="GET", responses=customDeleteResponse())
@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def deleteUserView(request):
    if request.method == "GET":
        user = request.user
        DeletedUsers.objects.create(email=user.email)
        user.delete()
        data = {"status": "OK", "message": deleted_message}
        return Response(data=data, status=status.HTTP_200_OK)
