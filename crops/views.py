from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated

from .models import Crop
from .serializers.common import CropSerializer
from .serializers.populated import PopulatedCropSerializer

class CropListView(APIView):
    ''' Controller for get/post request to /crops endpoint '''
    
    def get(self, _request):
        crops = Crop.objects.all()
        serialized_crop = PopulatedCropSerializer(crops, many=True)
        return Response(serialized_crop.data, status=status.HTTP_200_OK)

    
    def post(self, request):
        request.data['owner'] = request.user.id
        crop_to_create = CropSerializer(data=request.data)
        if crop_to_create.is_valid():
            crop_to_create.save()
            return Response(crop_to_create.data, status=status.HTTP_201_CREATED)
        return Response(crop_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class CropDetailView(APIView): # extend the APIView

    def get_crop(self, pk):
        ''' returns crop from db by its pk(id) or responds 404 not found '''
        try:
            return Crop.objects.get(pk=pk)
        except Crop.DoesNotExist:
            raise NotFound()
            

    def get(self, _request, pk):
        crop = self.get_crop(pk=pk) # get a crop by id
        serialized_crop = PopulatedCropSerializer(crop)
        return Response(serialized_crop.data, status=status.HTTP_200_OK)  # send the JSON to the client

    def put(self, request, pk):
        crop_to_update = self.get_crop(pk=pk)
        if crop_to_update.owner.id != request.user.id:
            raise PermissionDenied()
        updated_crop = CropSerializer(crop_to_update, data=request.data)
        if updated_crop.is_valid():
            updated_crop.save()
            return Response(updated_crop.data, status=status.HTTP_202_ACCEPTED)
        return Response(updated_crop.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def delete(self, request, pk):
        crop_to_delete = self.get_crop(pk=pk)
        if crop_to_delete.owner.id != request.user.id:
            raise PermissionDenied()
        crop_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)