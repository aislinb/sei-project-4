from rest_framework import serializers
from ..models import CompanionGroup

class CompanionGroupSerializer(serializers.ModelSerializer):

    class Meta:
        model = CompanionGroup
        fields = '__all__'
