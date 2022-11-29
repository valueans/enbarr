from django.contrib.auth import get_user_model
from django.utils.translation import ugettext_lazy as _
from rest_framework import serializers
from users.models import UserSearchSave
from users.api.serializers import UserProfileSerializer
from home.models import (
    ContactUs,
    HorseImages,
    Keywords,
    Horses,
    Favourite,
    Likes,
    DisLikes,
    Report,
    PrivacyPolicy,
    Temperaments,
    Disciplines,
    Colors,
    Breeds,
)

User = get_user_model()


class ContactUsSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(max_length=100, required=True)
    last_name = serializers.CharField(max_length=100, required=True)
    email = serializers.EmailField(required=True)
    query = serializers.CharField(max_length=1000, required=True)

    class Meta:
        model = ContactUs
        fields = "__all__"
        read_only_fields = ["id"]


class HorseImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = HorseImages
        fields = "__all__"
        read_only_fields = ["id"]


class KeywordsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Keywords
        fields = "__all__"
        read_only_fields = ["id"]


class TemperamentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Temperaments
        fields = "__all__"


class DisciplinesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Disciplines
        fields = "__all__"


class ColorsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Colors
        fields = "__all__"


class ColorsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Colors
        fields = "__all__"


class BreedsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Breeds
        fields = "__all__"


class HorseUpdateSerializer(serializers.ModelSerializer):
    images = HorseImagesSerializer(read_only=True, many=True)
    keywords = KeywordsSerializer(read_only=True, many=True)
    images_id = serializers.ListField(write_only=True, required=False)
    keywords_id = serializers.ListField(write_only=True, required=False)
    likes = serializers.SerializerMethodField(read_only=True)
    dislikes = serializers.SerializerMethodField(read_only=True)
    isliked = serializers.SerializerMethodField(read_only=True)
    isdisliked = serializers.SerializerMethodField(read_only=True)
    userprofile = serializers.SerializerMethodField(read_only=True)
    title = serializers.CharField(max_length=300, required=False)
    location = serializers.CharField(max_length=1000, required=False)
    price = serializers.FloatField(required=False)
    description = serializers.CharField(max_length=2000, required=False)
    breed = BreedsSerializer(read_only=True)
    breed_id = serializers.IntegerField(write_only=True, required=False)
    color = ColorsSerializer(read_only=True)
    color_id = serializers.IntegerField(write_only=True, required=False)
    temperament = TemperamentsSerializer(read_only=True)
    temperament_id = serializers.IntegerField(write_only=True, required=False)
    discipline = DisciplinesSerializer(read_only=True)
    discipline_id = serializers.IntegerField(write_only=True, required=False)
    gender = serializers.CharField(max_length=100, required=False)
    age = serializers.IntegerField(required=False)
    height = serializers.CharField(max_length=500, required=False)

    class Meta:
        model = Horses
        fields = "__all__"
        extra_kwargs = {"uploaded_by": {"required": False}}
        read_only_fields = ["id"]

    def update(self, instance, validated_data):
        for key, value in validated_data.items():
            if key == "images_id":
                for id in value:
                    obj = HorseImages.objects.get(id=id)
                    instance.images.add(obj)
            elif key == "keywords_id":
                instance.keywords.clear()
                for id in value:
                    obj = Keywords.objects.get(id=id)
                    instance.keywords.add(obj)
            elif key == "color_id":
                try:
                    color = Colors.objects.get(id=value)
                    instance.color = color
                except:
                    raise serializers.ValidationError(
                        {"status": "error", "message": "Invalid color_id"}
                    )
            elif key == "breed_id":
                try:
                    breed = Breeds.objects.get(id=value)
                    instance.breed = breed
                except:
                    raise serializers.ValidationError(
                        {"status": "error", "message": "Invalid breed_id"}
                    )
            elif key == "discipline_id":
                try:
                    discipline = Disciplines.objects.get(id=value)
                    instance.discipline = discipline
                except:
                    raise serializers.ValidationError(
                        {"status": "error", "message": "Invalid discipline_id"}
                    )
            elif key == "temerament_id":
                try:
                    temperament = Temperaments.objects.get(id=value)
                    instance.temperament = temperament
                except:
                    raise serializers.ValidationError(
                        {"status": "error", "message": "Invalid temperament_id"}
                    )

            else:
                setattr(instance, key, value)
        instance.save()
        return instance

    def get_userprofile(self, obj):
        serializer = UserProfileSerializer(
            obj.uploaded_by.userprofile, context=self.context
        )
        return serializer.data

    def get_likes(self, obj):
        return obj.likes.all().count()

    def get_dislikes(self, obj):
        return obj.dislikes.all().count()

    def get_isliked(self, obj):
        user = self.context["request"].user
        try:
            obj.likes.get(user=user)
        except:
            return False
        return True

    def get_isdisliked(self, obj):
        user = self.context["request"].user
        try:
            obj.dislikes.get(user=user)
        except:
            return False
        return True


class HorsesSerializer(serializers.ModelSerializer):
    images = HorseImagesSerializer(read_only=True, many=True)
    keywords = KeywordsSerializer(read_only=True, many=True)
    images_id = serializers.ListField(write_only=True, required=False)
    keywords_id = serializers.ListField(write_only=True, required=False)
    likes = serializers.SerializerMethodField(read_only=True)
    dislikes = serializers.SerializerMethodField(read_only=True)
    isliked = serializers.SerializerMethodField(read_only=True)
    isdisliked = serializers.SerializerMethodField(read_only=True)
    userprofile = serializers.SerializerMethodField(read_only=True)
    title = serializers.CharField(max_length=300, required=True)
    location = serializers.CharField(max_length=1000, required=True)
    price = serializers.FloatField(required=True)
    description = serializers.CharField(max_length=2000, required=True)
    breed = BreedsSerializer(read_only=True)
    breed_id = serializers.IntegerField(write_only=True, required=True)
    color = ColorsSerializer(read_only=True)
    color_id = serializers.IntegerField(write_only=True, required=True)
    temperament = TemperamentsSerializer(read_only=True)
    temperament_id = serializers.IntegerField(write_only=True, required=True)
    discipline = DisciplinesSerializer(read_only=True)
    discipline_id = serializers.IntegerField(write_only=True, required=True)
    gender = serializers.CharField(max_length=100, required=True)
    age = serializers.IntegerField(required=True)
    height = serializers.CharField(max_length=500, required=True)

    class Meta:
        model = Horses
        fields = "__all__"
        extra_kwargs = {"uploaded_by": {"required": False}}
        read_only_fields = ["id"]

    def create(self, validated_data):
        images_id = validated_data.pop("images_id")
        keywords_id = validated_data.pop("keywords_id")
        breed_id = validated_data.pop("breed_id")
        color_id = validated_data.pop("color_id")
        temperament_id = validated_data.pop("temperament_id")
        discipline_id = validated_data.pop("discipline_id")

        try:
            breed = Breeds.objects.get(id=breed_id)
        except:
            raise serializers.ValidationError(
                {"status": "error", "message": "Invalid breed_id"}
            )
        try:
            color = Colors.objects.get(id=color_id)
        except:
            raise serializers.ValidationError(
                {"status": "error", "message": "Invalid color_id"}
            )
        try:
            temperament = Temperaments.objects.get(id=temperament_id)
        except:
            raise serializers.ValidationError(
                {"status": "error", "message": "Invalid temperament_id"}
            )

        try:
            discipline = Disciplines.objects.get(id=discipline_id)
        except:
            raise serializers.ValidationError(
                {"status": "error", "message": "Invalid discipline_id"}
            )

        instance = Horses.objects.create(**validated_data)
        instance.color = color
        instance.temperament = temperament
        instance.discipline = discipline
        instance.breed = breed

        for id in images_id:
            try:
                image_instance = HorseImages.objects.get(id=id)
            except:
                raise serializers.ValidationError(
                    {"status": "error", "message": "Invalid image-id"}
                )
            instance.images.add(image_instance)

        for id in keywords_id:
            try:
                keyword_instance = Keywords.objects.get(id=id)
            except:
                raise serializers.ValidationError(
                    {"status": "error", "message": "Invalid keyword-id"}
                )
            instance.keywords.add(keyword_instance)

        instance.save()
        return instance

    def get_userprofile(self, obj):
        serializer = UserProfileSerializer(
            obj.uploaded_by.userprofile, context=self.context
        )
        return serializer.data

    def get_likes(self, obj):
        return obj.likes.all().count()

    def get_dislikes(self, obj):
        return obj.dislikes.all().count()

    def get_isliked(self, obj):
        user = self.context["request"].user
        try:
            obj.likes.get(user=user)
        except:
            return False
        return True

    def get_isdisliked(self, obj):
        user = self.context["request"].user
        try:
            obj.dislikes.get(user=user)
        except:
            return False
        return True


class FavouriteSerializer(serializers.ModelSerializer):
    horses = HorsesSerializer(read_only=True)
    horse_id = serializers.IntegerField(write_only=True, required=True)

    class Meta:
        model = Favourite
        fields = "__all__"
        read_only_fields = ["id"]

    def create(self, validated_data):
        id = validated_data.pop("horse_id")

        user = self.context["request"].user
        try:
            horseInstance = Horses.objects.get(id=id)
        except:
            raise serializers.ValidationError(
                {"status": "error", "message": "Invalid horse id"}
            )
        try:
            Favourite.objects.get(user=user, horses=horseInstance)
        except:
            instance = Favourite.objects.create(horses=horseInstance, **validated_data)
            return instance
        raise serializers.ValidationError({"status": "OK", "message": "Already Liked"})


class UserSearchSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSearchSave
        fields = "__all__"
        read_only_fields = ["id"]


class LikesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Likes
        fields = "__all__"


class DislikesSerializer(serializers.ModelSerializer):
    class Meta:
        model = DisLikes
        fields = "__all__"


class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = "__all__"


class PrivacyPolicySerializer(serializers.ModelSerializer):
    class Meta:
        model = PrivacyPolicy
        fields = "__all__"
