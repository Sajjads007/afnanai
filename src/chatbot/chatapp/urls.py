from django.urls import path
from chatapp.views import chatbot


app_name = 'chatapp'

urlpatterns = [
    path('',chatbot,name ='chatbot'),
]
