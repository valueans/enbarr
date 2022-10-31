from feedback.models import FeedBack
from rest_framework import serializers


class FeedBackSerializer(serializers.ModelSerializer):
    response = serializers.HiddenField(default=None)

    class Meta:
        model = FeedBack
        fields = "__all__"
