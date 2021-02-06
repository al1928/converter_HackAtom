from django.urls import path
from . import views

urlpatterns = [
    path('file-mp3', views.getTextFromMP3),
    path('file-wav', views.getTextFromWAV)
]