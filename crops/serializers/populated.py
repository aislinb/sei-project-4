
from crop_tags.serializers.common import CropTagSerializer
from companion_groups.serializers.common import CompanionGroupSerializer
from ..serializers.common import CropSerializer
from comments.serializers.populated import PopulatedCommentSerializer
class PopulatedCropSerializer(CropSerializer):
    """ Used for all outgoing serialization, includes populated Comments """

    tags = CropTagSerializer(many=True)
    comments = PopulatedCommentSerializer(many=True)
    companions = CompanionGroupSerializer(many=True)
