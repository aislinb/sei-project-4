from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers.populated import PopulatedCompanionGroupSerializer
from .models import CompanionGroup

class CompanionGroupListView(APIView):
    ''' Controller for get request /types '''

    def get(self, _request):
        companion_groups = CompanionGroup.objects.all()
        serialized_companion_groups = PopulatedCompanionGroupSerializer(companion_groups, many=True)
        return Response(serialized_companion_groups.data, status=status.HTTP_200_OK)

