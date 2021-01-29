from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers.populated import PopulatedCropTagSerializer
from .models import CropTag

class CropTagListView(APIView):
    ''' Controller for get request /types '''

    def get(self, _request):
        crop_tags = CropTag.objects.all()
        serialized_crop_tags = PopulatedCropTagSerializer(crop_tags, many=True)
        return Response(serialized_crop_tags.data, status=status.HTTP_200_OK)


