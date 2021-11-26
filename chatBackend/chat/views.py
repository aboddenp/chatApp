from rest_framework import viewsets
from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from rest_framework.serializers import Serializer


from .models import Message
from .serializers import MessageSerializer, RegisterSerializer,UserSerializer

# Create your views here.

class MessageViewSet(viewsets.ModelViewSet):
    queryset= Message.objects.all().order_by('date')
    serializer_class = MessageSerializer

class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
        "user": UserSerializer(user, context=self.get_serializer_context()).data,
        "token": AuthToken.objects.create(user)[1]
        })