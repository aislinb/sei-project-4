from rest_framework.authentication import BasicAuthentication
from rest_framework.exceptions import PermissionDenied
from django.contrib.auth import get_user_model
from django.conf import settings # for the secret key
import jwt

User = get_user_model()
# to deal with incoming request and ascertain what authentication level should be applied
# if they had a token that was valid, they would be assigned a "hasToken" level of request. 


class JWTAuthentication(BasicAuthentication):

    def authenticate(self, request):

        header = request.headers.get('Authorization')

        if not header:
            return None

        if not header.startswith('Bearer'):
            raise PermissionDenied({'message': 'Invalid authorization header'})

        token = header.replace('Bearer ', '')

        try:
            # key called "sub" with the users id on it will be returned. We look up the user with sub and store its value on "user".
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            user = User.objects.get(pk=payload.get('sub'))
        except jwt.exceptions.InvalidTokenError:
            raise PermissionDenied({'message': 'Invalid Token'})
        except User.DoesNotExist:
            raise PermissionDenied({'message': 'User not found'})
            # assuming this worked we will return a tuple containing what DRF should store as request.user, and request.auth:
        return (user, token)
