from crops.serializers.common import CropSerializer
from ..serializers.common import CompanionGroupSerializer

class PopulatedCompanionGroupSerializer(CompanionGroupSerializer):
    """ Used for all outgoing serialization, includes populated Pokemon """

    crops = CropSerializer(many=True)
