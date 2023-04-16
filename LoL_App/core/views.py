from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from .models import *

# Create your views here.
def front(request):
    context = { }
    return render(request, "index.html", context)

@api_view(['GET','POST'])
def cs_data(request):
    if request.method == 'GET':
        #Do I actually want to fetch all of them? 
        #I probably want to just fetch the one matching the requested game ID? 
        #Use match_id to only get the specific game.
        data = CSData.objects.all() 
        serializer = CSDataSerializer(data, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = CSDataSerializer(data, many=True)
        if serializer.is_valid():
            serializer.save
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['DELETE'])
def cs_data_detail(request, match_id):
    try:
        data = CSData.objects.get(match_id=match_id)
    except CSData.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'DELETE':
        data.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
@api_view(['GET','POST'])
def player(request):
    if request.method == 'GET':
        data = Player.objects.all() 
        serializer = PlayerSerializer(data, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = PlayerSerializer(data, many=True)
        if serializer.is_valid():
            serializer.save
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['DELETE'])
def player_detail(request, match_id):
    try:
        data = Player.objects.get(match_id=match_id)
    except Player.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'DELETE':
        data.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)    

def 