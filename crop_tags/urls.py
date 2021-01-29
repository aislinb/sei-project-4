from django.urls import path
from .views import CropTagListView

urlpatterns = [
    path('', CropTagListView.as_view()),
    # path('<int:pk>/', CropTagDetailView.as_view()),
]
