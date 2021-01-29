from rest_framework import serializers
from ..models import CropTag

class CropTagSerializer(serializers.ModelSerializer):

    class Meta:
        model = CropTag
        fields = '__all__'
