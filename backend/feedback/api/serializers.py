from feedback.models import FeedBack
from rest_framework import serializers


class FeedBackSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeedBack
        fields = "__all__"
