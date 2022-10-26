from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authentication import TokenAuthentication
from rest_framework import status
from modules.terms_and_conditions.terms_and_conditions.models import TermAndCondition
from django.db.models import Q
from drf_yasg.utils import swagger_auto_schema
from datetime import datetime
from django.contrib.auth import get_user_model
from users.models import (
    UserProfile,
    SubscriptionPlans,
    Notifications,
    UserSearchSave,
    DeletedUsers,
)
from users.helpers import sendOtpEmail, verifyOtp

User = get_user_model()

from rest_framework.decorators import (
    api_view,
    permission_classes,
    authentication_classes,
)

from modules.terms_and_conditions.terms_and_conditions.serializers import (
    TermAndConditionSerializer,
)
from .swaggerParams import (
    createParam,
    customDeleteResponse,
    createParamList,
    customLikeResponse,
    customDisLikeResponse,
    customOtpResponse,
    customPasswordResetResponse,
    customSendOtpResponse,
)

from home.api.v1.serializers import (
    SignupSerializer,
    UserSerializer,
    ContactUsSerializer,
    HorseImagesSerializer,
    HorsesSerializer,
    KeywordsSerializer,
    FavouriteSerializer,
    UserProfileSerializer,
    SubscriptionPlansSerializer,
    NotificationsSerializer,
    UserSearchSaveSerializer,
    MessagesSerializer,
    ConversationSerializer,
    ReportSerializer,
    PasswordSerializer,
    FeedBackSerializer,
)
from home.models import (
    ContactUs,
    Keywords,
    HorseImages,
    Horses,
    Favourite,
    Likes,
    DisLikes,
    Messages,
    Conversation,
    Report,
    FeedBack,
)

deleted_message = "Successfully Deleted"


class SignupViewSet(ModelViewSet):
    serializer_class = SignupSerializer
    http_method_names = ["post"]


class LoginViewSet(ViewSet):
    """
    # Request
    {
        "username":"email",
        "password":"password"
    }
    # 203 Response if user not verified{
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
            "status": "ERROR",
            "token": token.key,
            "user": user_serializer.data,
            "message": "you are not verified your email please verify your email first to login,Verification OTP is sended on registered email",
        }
        return Response(data=data, status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION)


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


@swagger_auto_schema(method="get", responses={200: ContactUsSerializer(many=True)})
@swagger_auto_schema(method="post", request_body=ContactUsSerializer)
@api_view(["GET", "POST"])
@permission_classes([AllowAny])
@authentication_classes([TokenAuthentication])
def ContactUsView(request):
    if request.method == "GET":
        if request.user.is_authenticated and request.user.is_superuser:
            contact_us_obj = ContactUs.objects.all()
            serializer = ContactUsSerializer(contact_us_obj, many=True)
            return Response(data=serializer.data, status=status.HTTP_200_OK)

        data = {
            "status": "Error",
            "message": "Unauthorized",
        }
        return Response(data=data, status=status.HTTP_401_UNAUTHORIZED)

    if request.method == "POST":
        serializer = ContactUsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@swagger_auto_schema(
    method="GET", responses={200: TermAndConditionSerializer(many=True)}
)
@swagger_auto_schema(method="POST", request_body=TermAndConditionSerializer)
@swagger_auto_schema(
    method="PUT",
    manual_parameters=[
        createParam(
            paramName="terms-id",
            description="to update specific terms and condition",
        )
    ],
    request_body=TermAndConditionSerializer,
)
@swagger_auto_schema(
    method="DELETE",
    manual_parameters=[
        createParam(
            paramName="terms-id",
            description="to delete specific terms and condition",
        )
    ],
    responses=customDeleteResponse(),
)
@api_view(["GET", "POST", "PUT", "DELETE"])
@permission_classes([AllowAny])
@authentication_classes([TokenAuthentication])
def termAndConditionView(request):
    if request.method == "GET":
        queryset = TermAndCondition.objects.filter(is_active=True).order_by(
            "-updated_at"
        )[0:1]
        serializer = TermAndConditionSerializer(queryset, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    if request.method == "POST":
        if request.user.is_authenticated and request.user.is_superuser:
            serializer = TermAndConditionSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(author=request.user)
                return Response(data=serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        data = {
            "status": "Error",
            "message": "Unauthorized",
        }
        return Response(data=data, status=status.HTTP_401_UNAUTHORIZED)

    if request.method == "PUT":
        terms_id = request.GET.get("terms-id", None)
        if request.user.is_authenticated and request.user.is_superuser:
            if terms_id is None:
                data = {"status": "error", "message": "terms-id is required"}
                return Response(data=data, status=status.HTTP_404_NOT_FOUND)
            try:
                terms_and_condition = TermAndCondition.objects.get(id=terms_id)
            except:
                data = {"status": "error", "message": "Invalid terms-id"}
                return Response(data=data, status=status.HTTP_404_NOT_FOUND)
            serializer = TermAndConditionSerializer(
                terms_and_condition, data=request.data
            )
            if serializer.is_valid():
                serializer.save(author=request.user)
                return Response(data=serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    if request.method == "DELETE":
        terms_id = request.GET.get("terms-id", None)
        if request.user.is_authenticated and request.user.is_superuser:
            if terms_id is None:
                data = {"status": "error", "message": "terms-id is required"}
                return Response(data=data, status=status.HTTP_404_NOT_FOUND)
            try:
                terms_and_condition = TermAndCondition.objects.get(id=terms_id)
            except:
                data = {"status": "error", "message": "Invalid terms-id"}
                return Response(data=data, status=status.HTTP_404_NOT_FOUND)
            terms_and_condition.delete()
            data = {"status": "OK", "message": deleted_message}
            return Response(data=data, status=status.HTTP_200_OK)

        data = {
            "status": "Error",
            "message": "Unauthorized",
        }
        return Response(data=data, status=status.HTTP_401_UNAUTHORIZED)


@swagger_auto_schema(
    method="get",
    manual_parameters=[
        createParam(paramName="horse-id", description="to get all horse images")
    ],
    responses={200: HorseImagesSerializer(many=True)},
)
@swagger_auto_schema(method="post", request_body=HorseImagesSerializer)
@swagger_auto_schema(
    method="delete",
    manual_parameters=[
        createParam(
            paramName="image-id",
            description="to delete  a specific image from a horse post",
        )
    ],
    responses=customDeleteResponse(),
)
@api_view(["GET", "POST", "DELETE"])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def HorseImagesView(request):
    if request.method == "GET":
        horse_id = request.GET.get("horse-id", None)
        if horse_id is None:
            data = {"status": "ERROR", "message": "horse-id is required"}
            return Response(data=data, status=status.HTTP_404_NOT_FOUND)
        try:
            horse = Horses.objects.get(id=horse_id)
        except:
            data = {"status": "ERROR", "message": "Invalid Horse id"}
            return Response(data=data, status=status.HTTP_404_NOT_FOUND)

        serializer = HorseImagesSerializer(horse.images, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    if request.method == "POST":
        serializer = HorseImagesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)

        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == "DELETE":
        image_id = request.POST.get("image-id", None)
        if image_id is None:
            data = {"status": "ERROR", "message": "image-id is required"}
            return Response(data=data, status=status.HTTP_404_NOT_FOUND)

        try:
            image = HorseImages.objects.get(id=image_id)
        except:
            data = {"status": "ERROR", "message": "Invalid image-id"}
            return Response(data=data, status=status.HTTP_404_NOT_FOUND)
        image.delete()
        data = {
            "status": "OK",
            "message": deleted_message,
        }
        return Response(data=data, status=status.HTTP_200_OK)


@swagger_auto_schema(
    method="get",
    manual_parameters=[
        createParam(paramName="horse-id", description="to get all horse keywords")
    ],
    responses={200: KeywordsSerializer(many=True)},
)
@swagger_auto_schema(method="post", request_body=KeywordsSerializer)
@swagger_auto_schema(
    method="put",
    manual_parameters=[
        createParam(paramName="keyword-id", description="to get keywords")
    ],
    responses={200: KeywordsSerializer},
)
@swagger_auto_schema(
    method="delete",
    manual_parameters=[
        createParam(paramName="keyword-id", description="to delete keyword")
    ],
    responses=customDeleteResponse(),
)
@api_view(["GET", "POST", "PUT", "DELETE"])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def KeywordsView(request):
    if request.method == "GET":
        horse_id = request.GET.get("horse-id", None)
        if horse_id is None:
            keywords = Keywords.objects.all()
            serializer = KeywordsSerializer(keywords, many=True)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        try:
            horse = Horses.objects.get(id=horse_id)
        except:
            data = {"status": "ERROR", "message": "Invalid Horse id"}
            return Response(data=data, status=status.HTTP_404_NOT_FOUND)

        serializer = KeywordsSerializer(horse.keywords, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    if request.method == "POST":
        serializer = KeywordsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)

        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    if request.method == "PUT":
        keyword_id = request.GET.get("keyword-id", None)
        if keyword_id is None:
            data = {"status": "ERROR", "message": "keyword-id is required"}
            return Response(data=data, status=status.HTTP_404_NOT_FOUND)

        try:
            keyword = Keywords.objects.get(id=keyword_id)
        except:
            data = {"status": "ERROR", "message": "Invalid keyword-id"}
            return Response(data=data, status=status.HTTP_404_NOT_FOUND)

        serializer = KeywordsSerializer(keyword, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    if request.method == "DELETE":
        keyword_id = request.GET.get("keyword-id", None)
        if keyword_id is None:
            data = {"status": "ERROR", "message": "keyword-id is required"}
            return Response(data=data, status=status.HTTP_404_NOT_FOUND)

        try:
            keyword = Keywords.objects.get(id=keyword_id)
        except:
            data = {"status": "ERROR", "message": "Invalid keyword-id"}
            return Response(data=data, status=status.HTTP_404_NOT_FOUND)
        keyword.delete()
        data = {
            "status": "OK",
            "message": deleted_message,
        }
        return Response(data=data, status=status.HTTP_200_OK)


@swagger_auto_schema(
    method="get",
    manual_parameters=[
        createParam(
            paramName="horse-id",
            description="to get specific horse\nleave empty if you want all horses",
        )
    ],
    responses={200: HorsesSerializer(many=True)},
)
@swagger_auto_schema(method="post", request_body=HorsesSerializer)
@swagger_auto_schema(
    method="put",
    manual_parameters=[
        createParam(
            paramName="horse-id",
            description="to get specific horse\nleave empty if you want all horses",
        )
    ],
    responses={200: HorsesSerializer},
)
@swagger_auto_schema(
    method="delete",
    manual_parameters=[
        createParam(
            paramName="horse-id", description="to delete  a specific horse post"
        )
    ],
    responses=customDeleteResponse(),
)
@api_view(["GET", "POST", "PUT", "DELETE"])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def HorseView(request):
    if request.method == "GET":
        horse_id = request.GET.get("horse-id", None)
        if horse_id is None:
            horses = (
                Horses.objects.filter(uploaded_by=request.user).order_by("id").reverse()
            )

            serializer = HorsesSerializer(
                horses, many=True, context={"request": request}
            )
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        try:
            horse = Horses.objects.get(id=horse_id)
        except:
            data = {"status": "ERROR", "message": "Invalid Horse id"}
            return Response(data=data, status=status.HTTP_404_NOT_FOUND)

        serializer = HorsesSerializer(data=horse)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    if request.method == "POST":
        serializer = HorsesSerializer(data=request.data, context={"request": request})
        user_profile = UserProfile.objects.get(user=request.user)
        if user_profile.promotion_adds > 0:
            if serializer.is_valid():
                serializer.save(uploaded_by=request.user)
                user_profile.promotion_adds -= 1
                user_profile.save()
                return Response(data=serializer.data, status=status.HTTP_200_OK)
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            data = {
                "status": "error",
                "message": "your promotion add are finished subscribe to a plan to post a new add.",
            }
            return Response(data=data, status=status.HTTP_400_BAD_REQUEST)

    if request.method == "PUT":
        horse_id = request.GET.get("horse-id", None)
        if horse_id is None:
            data = {"status": "ERROR", "message": "horse-id is required"}
            return Response(data=data, status=status.HTTP_404_NOT_FOUND)

        try:
            horse = Horses.objects.get(id=horse_id)
        except:
            data = {"status": "ERROR", "message": "Invalid Horse id"}
            return Response(data=data, status=status.HTTP_404_NOT_FOUND)

        serializer = HorsesSerializer(horse, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == "DELETE":
        horse_id = request.GET.get("horse-id", None)
        if horse_id is None:
            data = {"status": "ERROR", "message": "horse-id is required"}
            return Response(data=data, status=status.HTTP_404_NOT_FOUND)

        try:
            horse = Horses.objects.get(id=horse_id)
        except:
            data = {"status": "ERROR", "message": "Invalid horse-id"}
            return Response(data=data, status=status.HTTP_404_NOT_FOUND)
        horse.delete()
        data = {
            "status": "OK",
            "message": deleted_message,
        }
        return Response(data=data, status=status.HTTP_200_OK)


@swagger_auto_schema(method="get", responses={200: FavouriteSerializer(many=True)})
@swagger_auto_schema(method="post", request_body=FavouriteSerializer)
@swagger_auto_schema(
    method="put",
    manual_parameters=[
        createParam(
            paramName="favourite-id", description="to update specific favourite"
        )
    ],
    responses={200: FavouriteSerializer},
)
@swagger_auto_schema(
    method="delete",
    manual_parameters=[
        createParam(
            paramName="favourite-id", description="to delete specific favourite"
        )
    ],
    responses=customDeleteResponse(),
)
@api_view(["GET", "POST", "PUT", "DELETE"])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def favouriteView(request):
    if request.method == "GET":
        instance = Favourite.objects.filter(user=request.user)
        serializer = FavouriteSerializer(instance, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    if request.method == "POST":
        serializer = FavouriteSerializer(
            data=request.data, context={"request": request}
        )
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors, status=status.HTTP_200_OK)

    if request.method == "PUT":
        favourite_id = request.GET.get("favourite-id", None)
        if favourite_id is None:
            data = {"status": "error", "message": "favourite-id is required"}
            return Response(data=data, status=status.HTTP_404_NOT_FOUND)
        try:
            instance = Favourite.objects.get(id=favourite_id)
        except:
            data = {"status": "error", "message": "Invalid favourite-id"}
            return Response(data=data, status=status.HTTP_404_NOT_FOUND)

        serializer = FavouriteSerializer(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == "DELETE":
        favourite_id = request.GET.get("favourite-id", None)
        if favourite_id is None:
            data = {"status": "error", "message": "favourite-id is required"}
            return Response(data=data, status=status.HTTP_404_NOT_FOUND)
        try:
            instance = Favourite.objects.get(id=favourite_id)
        except:
            data = {"status": "error", "message": "Invalid favourite-id"}
            return Response(data=data, status=status.HTTP_404_NOT_FOUND)

        instance.delete()
        data = {"status": "ok", "message": deleted_message}
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


@swagger_auto_schema(
    method="get", responses={200: SubscriptionPlansSerializer(many=True)}
)
@swagger_auto_schema(method="post", request_body=SubscriptionPlansSerializer)
@swagger_auto_schema(method="put", responses={200: SubscriptionPlansSerializer})
@swagger_auto_schema(method="delete", responses=customDeleteResponse())
@api_view(["GET", "POST", "PUT", "DELETE"])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def plansView(request):
    if request.method == "GET":
        instance = SubscriptionPlans.objects.all()
        serializer = SubscriptionPlansSerializer(instance, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
    if request.method == "POST":
        serializer = SubscriptionPlansSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == "PUT":
        plan_id = request.GET.get("plan-id", None)
        if plan_id is None:
            data = {"status": "error", "message": "plan-id is required"}
            return Response(data=data, status=status.HTTP_404_NOT_FOUND)
        try:
            instance = SubscriptionPlans.objects.get(id=plan_id)
        except:
            data = {"status": "error", "message": "Invalid plan-id"}
            return Response(data=data, status=status.HTTP_404_NOT_FOUND)

        serializer = SubscriptionPlansSerializer(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == "DELETE":
        plan_id = request.GET.get("plan-id", None)
        if plan_id is None:
            data = {"status": "error", "message": "plan-id is required"}
            return Response(data=data, status=status.HTTP_404_NOT_FOUND)
        try:
            instance = SubscriptionPlans.objects.get(id=plan_id)
        except:
            data = {"status": "error", "message": "Invalid plan-id"}
            return Response(data=data, status=status.HTTP_404_NOT_FOUND)
        instance.delete()
        data = {"status": "ok", "message": deleted_message}
        return Response(data=data, status=status.HTTP_200_OK)


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


@swagger_auto_schema(
    method="get",
    manual_parameters=[
        createParamList(paramName="keywords", description="to search using keywords"),
        createParam(paramName="title", description="to search for specific title"),
    ],
    responses={200: NotificationsSerializer(many=True)},
)
@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def searchHorseView(request):
    if request.method == "GET":
        keywords = request.GET.get("keywords", None)
        title = request.GET.get("title", None)
        if keywords != None:
            instance = Horses.objects.filter(keywords__keyword__in=keywords)
        if title != None:
            instance = Horses.objects.filter(title__contains=title)
        if keywords is None and title is None:
            instance = Horses.objects.all()

        serializer = HorsesSerializer(instance, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)


@swagger_auto_schema(method="GET", responses={200: UserSearchSaveSerializer(many=True)})
@swagger_auto_schema(method="POST", request_body=UserSearchSaveSerializer)
@swagger_auto_schema(
    method="DELETE",
    manual_parameters=[
        createParam(paramName="search-id", description="to delete specific search"),
    ],
    responses=customDeleteResponse(),
)
@api_view(["GET", "POST", "DELETE"])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def userSearchView(request):
    if request.method == "GET":
        instance = UserSearchSave.objects.filter(user=request.user)
        serializer = UserSearchSaveSerializer(instance, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
    if request.method == "POST":
        serializer = UserSearchSaveSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(data=serializer.data, status=status.HTTP_200_OK)

    if request.method == "DELETE":
        search_id = request.GET.get("search-id", None)
        if search_id is None:
            data = {"status": "error", "message": "search-id is required"}
            return Response(data=data, status=status.HTTP_404_NOT_FOUND)
        try:
            instance = UserSearchSave.objects.get(id=search_id)
        except:
            data = {"status": "error", "message": "Invalid search-id"}
            return Response(data=data, status=status.HTTP_404_NOT_FOUND)
        instance.delete()
        data = {"status": "ok", "message": deleted_message}
        return Response(data=data, status=status.HTTP_200_OK)


@swagger_auto_schema(
    method="GET",
    manual_parameters=[
        createParam(paramName="horse-id", description="to like a specific horse"),
    ],
    responses=customLikeResponse(),
)
@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def likeHorseView(request):
    horse_id = request.GET.get("horse-id", None)
    if horse_id is None:
        data = {"status": "ERROR", "message": "horse-id is required"}
        return Response(data=data, status=status.HTTP_404_NOT_FOUND)

    try:
        horse = Horses.objects.get(id=horse_id)
    except:
        data = {"status": "ERROR", "message": "Invalid horse id"}
        return Response(data=data, status=status.HTTP_404_NOT_FOUND)

    instance, created = Likes.objects.get_or_create(user=request.user)

    horse.likes.add(instance)

    try:
        get_dislike = horse.dislikes.get(user=request.user)
        horse.dislikes.remove(get_dislike)
    except:
        pass

    horse.save()

    likes = horse.likes.all().count()

    data = {"status": "OK", "message": "Successfull", "likes": likes}
    return Response(data=data, status=status.HTTP_200_OK)


@swagger_auto_schema(
    method="GET",
    manual_parameters=[
        createParam(paramName="horse-id", description="to dislike a specific horse"),
    ],
    responses=customDisLikeResponse(),
)
@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def dislikeHorseView(request):
    horse_id = request.GET.get("horse-id", None)
    if horse_id is None:
        data = {"status": "ERROR", "message": "horse-id is required"}
        return Response(data=data, status=status.HTTP_404_NOT_FOUND)
    try:
        horse = Horses.objects.get(id=horse_id)
    except:
        data = {"status": "ERROR", "message": "Invalid horse id"}
        return Response(data=data, status=status.HTTP_404_NOT_FOUND)

    instance, created = DisLikes.objects.get_or_create(user=request.user)
    horse.dislikes.add(instance)

    try:
        get_like = horse.likes.get(user=request.user)
        horse.likes.remove(get_like)
    except:
        pass

    horse.save()

    dislikes = horse.dislikes.all().count()

    data = {"status": "OK", "message": "Successfull", "dislikes": dislikes}
    return Response(data=data, status=status.HTTP_200_OK)


@swagger_auto_schema(
    method="get",
    manual_parameters=[
        createParam(
            paramName="message-id", description="to get details of specific message"
        )
    ],
    responses={200: MessagesSerializer()},
)
@swagger_auto_schema(method="post", request_body=MessagesSerializer)
@swagger_auto_schema(
    method="delete",
    manual_parameters=[
        createParam(paramName="message-id", description="to delete message")
    ],
    responses=customDeleteResponse(),
)
@api_view(["GET", "POST", "DELETE"])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def messagesView(request):
    if request.method == "GET":
        message_id = request.GET.get("message-id", None)
        if message_id is None:
            data = {"status": "ERROR", "message": "message-id is required"}
            return Response(data=data, status=status.HTTP_404_NOT_FOUND)
        try:
            message = Messages.objects.get(id=message_id)
        except:
            data = {"status": "ERROR", "message": "Invalid message-id"}
            return Response(data=data, status=status.HTTP_404_NOT_FOUND)
        serializer = MessagesSerializer(message)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    if request.method == "POST":
        serializer = MessagesSerializer(data=request.data)
        if serializer.is_valid():
            message_instance = serializer.save()
            try:
                conversation_instance = Conversation.objects.get(
                    Q(user_one=message_instance.sender)
                    & Q(user_two=message_instance.receiver)
                    | Q(user_one=message_instance.receiver)
                    | Q(user_two=message_instance.sender)
                )
                conversation_instance.updated_at = datetime.now()
                conversation_instance.message.add(message_instance)
                conversation_instance.save()
            except:
                conversation_instance = Conversation.objects.create(
                    user_one=message_instance.sender,
                    user_two=message_instance.receiver,
                    updated_at=datetime.now(),
                )
                conversation_instance.message.add(message_instance)
                conversation_instance.save()
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
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


@swagger_auto_schema(method="get", responses={200: ConversationSerializer(many=True)})
@swagger_auto_schema(
    method="delete",
    manual_parameters=[
        createParam(
            paramName="conversation-id", description="to delete specific conversation"
        )
    ],
    responses=customDeleteResponse(),
)
@api_view(["GET", "DELETE"])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def conversationView(request):
    if request.method == "GET":
        intance = Conversation.objects.get(
            Q(user_one=request.user) | Q(user_two=request.user)
        )
        serializer = ConversationSerializer(intance)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
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
        instance.delete()
        data = {"status": "OK", "message": deleted_message}
        return Response(data=data, status=status.HTTP_200_OK)


@swagger_auto_schema(
    method="GET",
    manual_parameters=[
        createParam(
            paramName="horse-id",
            description="to get all the reports on a specific horse",
        )
    ],
    responses={200: ReportSerializer(many=True)},
)
@swagger_auto_schema(method="POST", request_body=ReportSerializer)
@swagger_auto_schema(
    method="DELETE",
    manual_parameters=[
        createParam(paramName="report-id", description="to delete specific report")
    ],
    responses=customDeleteResponse(),
)
@api_view(["GET", "POST", "DELETE"])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def ReportView(request):
    if request.method == "GET":
        horse_id = request.GET.get("horse-id", None)
        if horse_id is None:
            data = {"status": "ERROR", "message": "horse-id is required"}
            return Response(data=data, status=status.HTTP_404_NOT_FOUND)

        reports = Report.objects.filter(horse__id=horse_id)
        serializer = ReportSerializer(reports, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    if request.method == "POST":
        serializer = ReportSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == "DELETE":
        report_id = request.GET.get("report-id", None)
        if report_id is None:
            data = {"status": "ERROR", "message": "report-id is required"}
            return Response(data=data, status=status.HTTP_404_NOT_FOUND)

        report = Report.objects.get(id=report_id)
        report.delete()
        data = {"status": "OK", "message": deleted_message}
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
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
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
