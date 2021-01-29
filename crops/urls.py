from django.urls import path
from .views import CropListView, CropDetailView

urlpatterns = [
    path('', CropListView.as_view()),
    path('<int:pk>/', CropDetailView.as_view()),
]
