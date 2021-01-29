from django.urls import path
from .views import CompanionGroupListView

urlpatterns = [
    path('', CompanionGroupListView.as_view()),
    # path('<int:pk>/', CropTagDetailView.as_view()),
]
