
from crop_tags.serializers.common import CropTagSerializer
from ..serializers.common import CropSerializer

class PopulatedCropSerializer(CropSerializer):
    """ Used for all outgoing serialization, includes populated Comments """

    tags = CropTagSerializer(many=True)
