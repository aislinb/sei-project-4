from crops.serializers.common import CropSerializer
from ..serializers.common import CropTagSerializer

class PopulatedCropTagSerializer(CropTagSerializer):
    """ Used for all outgoing serialization, includes populated Pokemon """

    crops = CropSerializer(many=True)
