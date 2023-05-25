from dotenv import load_dotenv
import os
from riotwatcher import LolWatcher, ApiError
from datetime import timedelta

load_dotenv()

token = os.getenv('TOKEN')
#why does placing the value of token here not work?
lol_watcher = LolWatcher(f'{token}')

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
    def __init__(self,region:str,summoner_name:str):
        self.summoner_name = summoner_name
        self.region = region
        self.id = summoner_dto['id']
        self.accountId = summoner_dto['accountId']
        self.puuid = summoner_dto['puuid']
        self.profileIconId = summoner_dto['profileIconId']
        self.revisionDate = summoner_dto['revisionDate']
        self.summonerLevel = summoner_dto['summonerLevel']
        summoner_dto = lol_watcher.summoner.by_name(f'{region}', f'{summoner_name}')

    def get_matches(self,number=10):
        self.puuid
        return lol_watcher.match.matchlist_by_puuid(puuid=self.puuid,region=self.region,count=number)

class Match:
    def __init__(self,match_id:str,summoner_name:str,region:str):
        self.match_id = match_id
        self.match_dto = lol_watcher.match.by_id(region,match_id) #This should be the match_dto not the match TL dto
        self.target_summoner = Summoner(summoner_name,region)
    
    def get_summoner_list(self):
        summoners = self.match_dto['info']['participants']
        # Currently glitches if for some reason a match has null participants. ARAMS will probably need to be handled separartely as well. Possibly do the following: if summoners is None or []: 
        summonerlist = []
        for i in range(2):
            summoner = summoners[i]
            summonerlist.append({
                'name':summoner['summonerName'],
                'role':summoner['role'],
                'kills':summoner['kills'],
                'deaths':summoner['deaths'],
                'assists':summoner['assists'],
                'kda':summoner['challenges']['kda'],
                'champion':summoner['championName'],
                'items':[summoner['item0'],summoner['item1'],summoner['item2'],summoner['item3'],summoner['item4'],summoner['item5'],summoner['item6']],
                'spells':[summoner['summoner1Id'],summoner['summoner2Id']],
                })
            return summonerlist
    
    def get_kda(self):
        target_puuid = self.target_summoner.puuid
        participant_index = self.match_dto['metadata']['participants'].index(target_puuid)
        participant = self.match_dto['info']['participants'][participant_index]
        kda = participant['challenges']['kda']
        return kda
    def get_summoners(self):
        target_puuid = self.target_summoner.puuid
        participant_index = self.match_dto['metadata']['participants'].index(target_puuid)
        participant = self.match_dto['info']['participants'][participant_index]
        summonerspells = [participant['summoner1Id'],participant['summoner2Id']]
        return summonerspells
    
    def get_type(self):
        return self.match_dto['info']['gameMode']
    
    def get_duration(self):
        return str(timedelta(seconds=self.match_dto['info']['gameDuration'])) #does this work?

def get_match_tl(match_id:str, region:str):
    return lol_watcher.match.timeline_by_match(region=region,match_id=match_id)

def get_cs(match,minute:int,puuid:str):
    player = match['metadata']['participants'].index(puuid)
    cs_at = match['info']['frames'][minute]['participantFrames'][f'{player}']['minionsKilled']
    return(cs_at)

def get_frames(match):
    duration = len(match['info']['frames'])
    frames = []
    for i in range(duration):
        frames.append(i)
    return(frames)

def total_delta_CS(match,puuid:str):
    frames = get_frames(match)
    match_id = match['metadata']['matchId']
    cs = {}
    for frame in frames: 
        cs_at = get_cs(match=match,minute=frame,puuid=puuid)
        delta_cs = cs_at-get_cs(match=match,minute=frame-1,puuid=puuid)
        cs[frame] = {f'CS @ {frame}':cs_at, 'Delta CS':delta_cs}
    cs[0] = {f'CS @ {0}':0,'Delta CS':0} #kinda ugly but whatever
    cs_graph = {match_id:cs}
    return(cs_graph)

def total_problem_delta_CS(match,puuid:str,target=4):
    frames = get_frames(match)
    match_id = match['metadata']['matchId']
    cs = {}   
    for frame in frames: 
        cs_at = get_cs(match=match,minute=frame,puuid=puuid)
        delta_cs = cs_at-get_cs(match=match,minute=frame-1,puuid=puuid)
        if frame > 2 and delta_cs < target:
            cs[frame] = {f'CS @ {frame}':cs_at, 'Delta CS':delta_cs}
    cs[0] = {f'CS @ {0}':0,'Delta CS':0} #kinda ugly but whatever
    cs_graph = {match_id:cs}
    return(cs_graph)