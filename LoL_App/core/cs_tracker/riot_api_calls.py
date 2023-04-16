from dotenv import load_dotenv
import os
from riotwatcher import LolWatcher, ApiError
from pandas import DataFrame as df

load_dotenv()

token = os.getenv('TOKEN')
#why does placing the value of token here not work?
lol_watcher = LolWatcher(f'{token}')

#testregion is 'na1'

def error_wrapper(response):
    try: 
        response
        return(response)
    except ApiError as err:
        if err.response.status_code == 429:
            return('429: Retry in {} seconds.'.format(err.response.headers['Retry-After']))
        elif err.response.status_code == 404:
            return('404: Data not found.')
        elif err.response.status_code == 500:
            return('500: Internal server error.')
        elif err.response.status_code == 502:
            return('502: Internal server error.')
        elif err.response.status_code == 503:
            return('503: Service unavailable.')
        elif err.response.status_code == 504:
            return('504: Gateway timeout.')
        elif err.response.status_code == 401:
            return('401: Unauthorized.')
        elif err.response.status_code == 403:
            return('403: Forbidden.')  
        else:
            raise

class Summoner:
    def __init__(self,region:str,summonername:str):
        summoner_dto = lol_watcher.summoner.by_name(f'{region}', f'{summonername}')
        self.puuid = summoner_dto(f'{region}', f'{summonername}')['puuid']
        #add stuff like rank, icon, etc    

class Match:
    def __init__(self,match_id:str,region:str):
        self.match_id = match_id
        self.match_dto = lol_watcher.match.by_id(region,match_id)
    
    def get_summoner_list(self):
        summoners = self.match_dto['info']['participants']
        summonerlist = {}
        for i in range(0,9):
            summoner = summoners[i]
            summonerlist[i] = {
                'name':summoner['summonerName'],
                'kills':summoner['kills'],
                'deaths' : summoner['deaths'],
                'assists' : summoner['assists'],
                'kda': summoner['challenges']['kda'],
                'role' : summoner['role'],
                'champion' : summoner['championName'],
                'items':[summoner['item0'],summoner['item1'],summoner['item2'],summoner['item3'],summoner['item4'],summoner['item5'],summoner['item6']]
                }
        return summonerlist
    
test_list = Match('NA1_4628282743','na1').get_summoner_list()
print(test_list)

def get_matches(puuid:str,region='na1',number=10):
    return lol_watcher.match.matchlist_by_puuid(puuid=puuid,region=region,count=number)
    
def get_match_tl(match_id:str, region='na1'):
    return lol_watcher.match.timeline_by_match(region=region,match_id=match_id)

def get_cs(match,minute:int,puuid:str):
    player = match['metadata']['participants'].index(puuid)
    cs_at = match['info']['frames'][minute]['participantFrames'][f'{player}']['minionsKilled']
    return(cs_at)

def get_gametime(match):
    duration = len(match['info']['frames'])
    gametime = []
    for i in range(duration):
        gametime.append(i)
    return(gametime)

def total_delta_CS(match,match_id:str,puuid:str):
    frames = get_gametime(match)
    cs_graph_ls = []
    for frame in frames: 
        cs_at = get_cs(match=match,minute=frame,puuid=puuid)
        Δ_cs = cs_at-get_cs(match=match,minute=frame-1,puuid=puuid)
        cs_graph_ls.append([frame,cs_at,Δ_cs,match_id])
    cs_graph = df(cs_graph_ls,columns=['Time','CS@','ΔCSPM','Match ID'])  
    cs_graph.at[0,'ΔCSPM'] = 0
    return(cs_graph)

def problem_delta_CS(match,match_id:str,puuid:str,target=4):
    frames = get_gametime(match)
    cs_graph_ls = []   
    for frame in frames: 
        cs_at = get_cs(match=match,minute=frame,puuid=puuid)
        Δ_cs = cs_at-get_cs(match=match,minute=frame-1,puuid=puuid)
        if frame > 2 and Δ_cs < target:
            cs_graph_ls.append([frame,cs_at,Δ_cs,match_id])
    cs_graph = df(cs_graph_ls,columns=['Time','CS@','ΔCSPM','Match ID'])  
    cs_graph.at[0,'ΔCSPM'] = 0
    return(cs_graph)

def cs_15(match,puuid):
    return get_cs(match=match,minute=15,puuid=puuid)


