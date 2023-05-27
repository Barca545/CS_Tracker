from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from .models import *
from .cs_tracker.riot_api_calls import * 
from django.http import JsonResponse


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

@api_view(['GET'])
def matchlist(request,summoner_name,region='na1',number=1):
    matches_dto = Summoner(region,summoner_name).get_matches(number)
    matchlist = {}
    for match_id in matches_dto:
        match = Match(match_id,summoner_name,region)
        matchlist[match.match_id] = {
            'id':match.match_id,
            'duration': match.get_duration(),
            'game_type': match.get_type(),
            'kda': match.get_kda(), 
            'summoner spells': match.get_summoner_spells(),
            'summoners_list': match.get_summoner_list(),
            }
    if request.method == 'GET':
        return JsonResponse(matchlist)

@api_view(['GET'])
def delta_cs(request,match_id,puuid,region='na1'):
    match = get_match_tl(match_id,region) #could find a way to move this outside the function using state hooks and stuff
    delta_cs = total_delta_CS(match,puuid) 
    if request.method == 'GET':
        return JsonResponse(delta_cs)

@api_view(['GET']) #needs url
def problem_delta_cs(request,match_id,puuid,region='na1'):
    match = get_match_tl(match_id,region) #could find a way to move this outside the function using state hooks and stuff
    problem_cs = total_problem_delta_CS(match,puuid) 
    if request.method == 'GET':
        return JsonResponse(problem_cs)

@api_view(['GET']) 
def cs_15(request,match_id,puuid,region):
    match = get_match_tl(match_id,region)
    if request.method == 'GET':
        return JsonResponse(get_cs(match=match,minute=15,puuid=puuid))