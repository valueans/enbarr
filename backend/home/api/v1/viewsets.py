from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authentication import TokenAuthentication
from rest_framework import status
from modules.terms_and_conditions.terms_and_conditions.models import TermAndCondition
from django.db.models import Q, F
from drf_yasg.utils import swagger_auto_schema
from datetime import datetime, date
from django.db.models import Q
from home.helpers import *
import ast
from payments.api.v1.helpers import createMonthlySubscriptionCharge
from django.contrib.auth import get_user_model
from notifications.onesignal_service import sendLikedHorseNotification
from users.models import (
    UserProfile,
    UserSearchSave,
)
import filetype

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
    deleted_message,
)

from home.api.v1.serializers import (
    ContactUsSerializer,
    HorseImagesSerializer,
    HorsesSerializer,
    HorseUpdateSerializer,
    KeywordsSerializer,
    FavouriteSerializer,
    UserSearchSaveSerializer,
    ReportSerializer,
    PrivacyPolicySerializer,
    TemperamentsSerializer,
    DisciplinesSerializer,
    ColorsSerializer,
    BreedsSerializer,
    LocationsSerializer,
)
from home.models import (
    ContactUs,
    Keywords,
    HorseImages,
    Horses,
    Favourite,
    Likes,
    DisLikes,
    Report,
    PrivacyPolicy,
    Temperaments,
    Colors,
    Disciplines,
    Breeds,
    Locations,
)


User = get_user_model()


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
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
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


@swagger_auto_schema(method="GET", responses={200: PrivacyPolicySerializer(many=True)})
@swagger_auto_schema(method="POST", request_body=PrivacyPolicySerializer)
@swagger_auto_schema(
    method="PUT",
    manual_parameters=[
        createParam(
            paramName="privacy-id",
            description="to update specific privacy policy",
        )
    ],
    request_body=PrivacyPolicySerializer,
)
@swagger_auto_schema(
    method="DELETE",
    manual_parameters=[
        createParam(
            paramName="privacy-id",
            description="to delete specific privacy policy",
        )
    ],
    responses=customDeleteResponse(),
)
@api_view(["GET", "POST", "PUT", "DELETE"])
@permission_classes([AllowAny])
@authentication_classes([TokenAuthentication])
def privacyPolicyView(request):
    if request.method == "GET":
        queryset = PrivacyPolicy.objects.filter(is_active=True).order_by("-updated_at")[
            0:1
        ]
        serializer = PrivacyPolicySerializer(queryset, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    if request.method == "POST":
        if request.user.is_authenticated and request.user.is_superuser:
            serializer = PrivacyPolicySerializer(data=request.data)
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
        privacy_id = request.GET.get("privacy-id", None)
        if request.user.is_authenticated and request.user.is_superuser:
            if privacy_id is None:
                data = {"status": "error", "message": "privacy-id is required"}
                return Response(data=data, status=status.HTTP_404_NOT_FOUND)
            try:
                privacy_policy = PrivacyPolicy.objects.get(id=privacy_id)
            except:
                data = {"status": "error", "message": "Invalid privacy-id"}
                return Response(data=data, status=status.HTTP_404_NOT_FOUND)
            serializer = PrivacyPolicySerializer(privacy_policy, data=request.data)
            if serializer.is_valid():
                serializer.save(author=request.user)
                return Response(data=serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    if request.method == "DELETE":
        privacy_id = request.GET.get("privacy-id", None)
        if request.user.is_authenticated and request.user.is_superuser:
            if privacy_id is None:
                data = {"status": "error", "message": "privacy-id is required"}
                return Response(data=data, status=status.HTTP_404_NOT_FOUND)
            try:
                privacy_policy = PrivacyPolicy.objects.get(id=privacy_id)
            except:
                data = {"status": "error", "message": "Invalid privacy-id"}
                return Response(data=data, status=status.HTTP_404_NOT_FOUND)
            privacy_policy.delete()
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

        images = horse.images.all().order_by("id")
        serializer = HorseImagesSerializer(images, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    if request.method == "POST":
        serializer = HorseImagesSerializer(data=request.data)
        if serializer.is_valid():
            file = request.FILES.get("file")
            kind = filetype.guess(file)
            type = kind.mime.split("/")[0]
            if type == "image":
                serializer.save(file_type="IMAGE")
            elif type == "video":
                serializer.save(file_type="VIDEO")
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)

        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == "DELETE":
        image_id = request.GET.get("image-id", None)
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
            return getPagination(keywords, request, KeywordsSerializer)
        try:
            horse = Horses.objects.get(id=horse_id)
        except:
            data = {"status": "ERROR", "message": "Invalid Horse id"}
            return Response(data=data, status=status.HTTP_404_NOT_FOUND)

        serializer = KeywordsSerializer(horse.keywords, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    if request.method == "POST":
        keyword_value = request.POST.get("keyword", None)
        if keyword_value is None or len(keyword_value) == 0:
            data = {"status": "error", "message": "keyword is required!"}
            return Response(data=data, status=status.HTTP_404_NOT_FOUND)
        print(keyword_value)
        keyword, created = Keywords.objects.get_or_create(keyword=keyword_value)
        print(keyword)
        serializer = KeywordsSerializer(keyword)
        return Response(data=serializer.data, status=status.HTTP_201_CREATED)
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
            return getPagination(horses, request, HorsesSerializer)
        try:
            horse = Horses.objects.get(id=horse_id)
            horse.total_views += 1
            horse.save()
        except:
            data = {"status": "ERROR", "message": "Invalid Horse id"}
            return Response(data=data, status=status.HTTP_404_NOT_FOUND)

        serializer = HorsesSerializer(horse, context={"request": request})
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    if request.method == "POST":
        try:
            if (
                request.user.userprofile.ban_user_from_posting == True
                and date.today() < request.user.userprofile.ban_user_from_posting_date
            ):
                data = {
                    "status": "ERROR",
                    "message": f"You cannot post add because you are banned till {request.user.userprofile.ban_user_from_posting_date}",
                }
                return Response(data=data, status=status.HTTP_401_UNAUTHORIZED)
        except:
            pass
        serializer = HorsesSerializer(data=request.data, context={"request": request})
        user_profile = UserProfile.objects.get(user=request.user)

        if (
            user_profile.subscription_renew_date is None
            and user_profile.promotion_adds == 0
        ):
            response = createMonthlySubscriptionCharge(user_profile.user)
            if response:
                pass
            else:
                data = {
                    "status": "error",
                    "message": "Your promotion period ended and we are unable to charge your card please add a new payment method.",
                }
                return Response(data=data, status=status.HTTP_400_BAD_REQUEST)
        if user_profile.promotion_adds > 0 or user_profile.subscription_adds > 0:
            if serializer.is_valid():
                serializer.save(uploaded_by=request.user)
                if user_profile.promotion_adds > 0:
                    user_profile.promotion_adds -= 1
                else:
                    user_profile.subscription_adds -= 1
                user_profile.save()
                return Response(data=serializer.data, status=status.HTTP_201_CREATED)
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            data = {
                "status": "error",
                "message": "You have 0 adds left Upgrade your subscription",
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

        serializer = HorseUpdateSerializer(
            horse, data=request.data, context={"request": request}
        )
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


@swagger_auto_schema(
    method="get",
    responses={200: HorsesSerializer(many=True)},
)
@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def HorsesView(request):
    querset = Horses.objects.all().order_by("id").reverse()
    return getPagination(querset, request, HorsesSerializer)


@swagger_auto_schema(method="get", responses={200: FavouriteSerializer(many=True)})
@swagger_auto_schema(method="post", request_body=FavouriteSerializer)
@swagger_auto_schema(
    method="delete",
    manual_parameters=[
        createParam(
            paramName="favourite-id", description="to delete specific favourite"
        )
    ],
    responses=customDeleteResponse(),
)
@api_view(["GET", "POST", "DELETE"])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def favouriteView(request):
    if request.method == "GET":
        queryset = Favourite.objects.filter(user=request.user).order_by("id").reverse()
        return getPagination(queryset, request, FavouriteSerializer)
    if request.method == "POST":
        serializer = FavouriteSerializer(
            data=request.data, context={"request": request}
        )
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors, status=status.HTTP_200_OK)

    if request.method == "DELETE":
        horse_id = request.GET.get("horse-id", None)
        if horse_id is None:
            data = {"status": "error", "message": "horse-id is required"}
            return Response(data=data, status=status.HTTP_404_NOT_FOUND)
        try:
            instance = Favourite.objects.get(horses__id=horse_id, user=request.user)
        except:
            data = {"status": "error", "message": "Invalid horse-id"}
            return Response(data=data, status=status.HTTP_404_NOT_FOUND)

        instance.delete()
        data = {"status": "ok", "message": deleted_message}
        return Response(data=data, status=status.HTTP_200_OK)


@swagger_auto_schema(method="get", responses={200: HorsesSerializer(many=True)})
@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def searchHorseView(request):
    if request.method == "GET":

        try:
            user_search_history = UserSearchSave.objects.get(user=request.user)
        except:
            data = {
                "status": "error",
                "message": "Please add the search criteria before match",
            }
            return Response(data=data, status=status.HTTP_400_BAD_REQUEST)

        current_year = date.today().year
        queryset = (
            Horses.objects.annotate(age=current_year - F("year_of_birth"))
            .all()
            .exclude(uploaded_by__id=request.user.id)
        )
        filter_queryset = []

        if user_search_history.location_id:
            filter_queryset += queryset.filter(location=user_search_history.location_id)
        if user_search_history.breed_id:
            filter_queryset += queryset.filter(breed=user_search_history.breed_id)
        if user_search_history.min_age:
            filter_queryset += queryset.filter(age__gte=user_search_history.min_age)
        if user_search_history.max_age:
            filter_queryset += queryset.filter(age__lte=user_search_history.max_age)
        if user_search_history.min_height:
            filter_queryset += queryset.filter(
                height__gte=user_search_history.min_height
            )
        if user_search_history.max_height:
            filter_queryset += queryset.filter(
                height__lte=user_search_history.max_height
            )
        if user_search_history.min_price:
            filter_queryset += queryset.filter(price__gte=user_search_history.min_price)
        if user_search_history.max_price:
            filter_queryset += queryset.filter(price__lte=user_search_history.max_price)
        if user_search_history.discipline_id:
            filter_queryset += queryset.filter(
                discipline=user_search_history.discipline_id
            )
        if user_search_history.gender:
            filter_queryset += queryset.filter(gender=user_search_history.gender)
        if user_search_history.color_id:
            filter_queryset += queryset.filter(color=user_search_history.color_id)
        if user_search_history.temperament_id:
            filter_queryset += queryset.filter(
                temperament=user_search_history.temperament_id
            )
        if user_search_history.keywords.all().count() > 0:
            filter_queryset += queryset.filter(
                keywords__in=user_search_history.keywords.all()
            )

        filter_list = (
            Horses.objects.filter(id__in=[q.id for q in filter_queryset])
            .distinct()
            .order_by("id")
            .reverse()
        )
        return getPagination(filter_list, request, HorsesSerializer)


@swagger_auto_schema(method="GET", responses={200: UserSearchSaveSerializer(many=True)})
@swagger_auto_schema(
    method="POST",
    request_body=UserSearchSaveSerializer,
    responses={200: UserSearchSaveSerializer(many=True)},
)
@swagger_auto_schema(
    method="DELETE",
    manual_parameters=[
        createParam(
            paramName="search-id",
            description="to delete specific search",
            required=True,
        ),
    ],
    responses=customDeleteResponse(),
)
@api_view(["GET", "POST", "DELETE"])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def userSearchView(request):
    if request.method == "GET":
        instance = UserSearchSave.objects.filter(user=request.user)
        serializer = UserSearchSaveSerializer(
            instance, many=True, context={"request": request}
        )
        return Response(data=serializer.data, status=status.HTTP_200_OK)
    if request.method == "POST":
        serializer = UserSearchSaveSerializer(
            data=request.data, context={"request": request}
        )
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        return Response(data=serializer.errors, status=status.HTTP_200_OK)

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
    if request.user != horse.uploaded_by:
        sendLikedHorseNotification(horse.uploaded_by, horse, request.user)
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
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
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


@swagger_auto_schema(
    method="GET",
    responses={200: TemperamentsSerializer(many=True)},
)
@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def temperamentView(request):
    if request.method == "GET":
        instance = Temperaments.objects.all()
        serializer = TemperamentsSerializer(instance, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)


@swagger_auto_schema(
    method="GET",
    responses={200: DisciplinesSerializer(many=True)},
)
@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def disciplineView(request):
    if request.method == "GET":
        instance = Disciplines.objects.all()
        serializer = DisciplinesSerializer(instance, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)


@swagger_auto_schema(
    method="GET",
    responses={200: ColorsSerializer(many=True)},
)
@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def colorView(request):
    if request.method == "GET":
        instance = Colors.objects.all()
        serializer = ColorsSerializer(instance, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)


@swagger_auto_schema(
    method="GET",
    responses={200: BreedsSerializer(many=True)},
)
@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def BreedView(request):
    if request.method == "GET":
        instance = Breeds.objects.all()
        serializer = BreedsSerializer(instance, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)


@swagger_auto_schema(
    method="GET",
    responses={200: LocationsSerializer(many=True)},
)
@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def LocationView(request):
    if request.method == "GET":
        instance = Locations.objects.all()
        serializer = LocationsSerializer(instance, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)


@swagger_auto_schema(
    method="GET",
    responses={200: HorsesSerializer(many=True)},
)
@api_view(["GET"])
def getRecentlyAddedHorsesView(request):
    horses = Horses.objects.all().order_by("id").reverse()[:3]
    return getPagination(horses, request, HorsesSerializer)


@swagger_auto_schema(
    method="GET",
    responses={200: HorsesSerializer(many=True)},
)
@api_view(["GET"])
def getTopHorseAddsView(request):
    horses = Horses.objects.all().order_by("total_views").reverse()[:6]
    return getPagination(horses, request, HorsesSerializer)


from django.db.models import Count


@swagger_auto_schema(
    method="GET",
    responses={200: HorsesSerializer(many=True)},
)
@api_view(["GET"])
def getTrendingHorseAddsView(request):
    horses = (
        Horses.objects.annotate(num_likes=Count("likes"))
        .all()
        .order_by("num_likes")
        .reverse()[:6]
    )
    return getPagination(horses, request, HorsesSerializer)
