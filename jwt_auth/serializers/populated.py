from crops.serializers.common import CropSerializer
from comments.serializers.common import CommentSerializer
from ..serializers.common import UserSerializer

class PopulatedUserSerializer(UserSerializer):

    created_crop = CropSerializer(many=True)
    posted_comments = CommentSerializer(many=True)
