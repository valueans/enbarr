from rest_framework import serializers
from .models import TermAndCondition


class TermAndConditionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TermAndCondition
        fields = "__all__"
