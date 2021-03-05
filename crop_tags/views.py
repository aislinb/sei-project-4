from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied

from .serializers.common import CropTagSerializer
from .serializers.populated import PopulatedCropTagSerializer
from .models import CropTag

class CropTagListView(APIView):
    ''' Controller for get request /types '''

    def get(self, _request):
        crop_tags = CropTag.objects.all()
        serialized_crop_tags = PopulatedCropTagSerializer(crop_tags, many=True)
        return Response(serialized_crop_tags.data, status=status.HTTP_200_OK)

class CropTagDetailView(APIView): # extend the APIView
    
    def get_crop_tag(self, pk):
        ''' returns crop from db by its pk(id) or responds 404 not found '''
        try:
            return CropTag.objects.get(pk=pk)
        except CropTag.DoesNotExist:
            raise NotFound()
            

    def get(self, _request, pk):
        crop_tag = self.get_crop_tag(pk=pk) # get a crop by id
        serialized_crop_tag = PopulatedCropTagSerializer(crop_tag)
        return Response(serialized_crop_tag.data, status=status.HTTP_200_OK)  # send the JSON to the client

