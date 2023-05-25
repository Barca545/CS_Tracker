"""
URL configuration for LoL_App project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from core.views import *  #Specify once done

urlpatterns = [
    path('admin/', admin.site.urls),
    path("", front, name="front"),
    path("cs_data/", cs_data, name="cs_data"),
    path("cs_data/<str:match_id>", cs_data_detail, name="cs_data_detail"), #used to say "detail, is that ok?"
    path("player/", player, name="player"),
    path("player/<str:match_id>", player_detail, name="player_detail"),#used to say "detail, is that ok?"
    path("matchlist/<summoner_name>/<region>/<number>/", matchlist, name="matchlist"),
    path("delta_cs/<match_id>/<puuid>/<region>/", delta_cs, name="delta_cs"),
    path("problem_delta_cs/<match_id>/<puuid>/<region>/", problem_delta_cs, name="problem_delta_cs"),
    path("cs_15/<match_id>/<puuid>/<region>/", cs_15, name="cs_15"),
]
