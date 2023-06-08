from django.urls import path
from . import views

urlpatterns = [
    path('home/', views.LoginView.as_view(), name ='home'), #path should probably be like "login"
    path('logout/', views.LogoutView.as_view(), name ='logout'),
]    
