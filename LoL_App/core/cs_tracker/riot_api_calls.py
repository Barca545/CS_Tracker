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
        self.summoner_dto = lol_watcher.summoner.by_name(f'{region}', f'{summoner_name}')
        self.puuid = self.summoner_dto['puuid']
        
    def get_id(self):
        return self.summoner_dto['id']
    
    def get_accountID(self):
        return self.summoner_dto['accountId']
    
    def get_puuid(self):
        return self.summoner_dto['puuid']
    
    def get_profileIconID(self):
        return self.summoner_dto['profileIconId']
    
    def get_revision_date(self):
        return self.summoner_dto['revisionDate']
    
    def get_level(self):
        return self.summoner_dto['summonerLevel']

    def get_matches(self,number=10):
        puuid = self.puuid
        return lol_watcher.match.matchlist_by_puuid(puuid=puuid,region=self.region,count=number)

class Match:
    def __init__(self,match_id:str,summoner_name:str,region:str):
        self.match_id = match_id
        self.match_dto = lol_watcher.match.by_id(region,match_id) #This should be the match_dto not the match TL dto
        self.target_summoner = Summoner(region,summoner_name)
        self.region = region
    
    def get_summoner_list(self):
        summoners = self.match_dto['info']['participants']
        # Currently glitches if for some reason a match has null participants. ARAMS will probably need to be handled separartely as well. Possibly do the following: if summoners is None or []: 
        summonerlist = []
        for new_summoner in summoners:
            summonerlist.append({
                'name':new_summoner['summonerName'],
                'role':new_summoner['role'],
                'kills':new_summoner['kills'],
                'deaths':new_summoner['deaths'],
                'assists':new_summoner['assists'],
                'kda':round(new_summoner['challenges']['kda'],2),
                'champion':new_summoner['championName'],
                'items':[new_summoner['item0'],new_summoner['item1'],new_summoner['item2'],new_summoner['item3'],new_summoner['item4'],new_summoner['item5'],new_summoner['item6']],
                'spells':[new_summoner['summoner1Id'],new_summoner['summoner2Id']],
                })
        return summonerlist
    
    def get_kda(self):
        target_puuid = self.target_summoner.puuid
        participant_index = self.match_dto['metadata']['participants'].index(target_puuid)
        participant = self.match_dto['info']['participants'][participant_index]
        kda = round(participant['challenges']['kda'],2)
        return kda
    
    def get_summoner_spells(self):
        target_puuid = self.target_summoner.puuid
        participant_index = self.match_dto['metadata']['participants'].index(target_puuid)
        participant = self.match_dto['info']['participants'][participant_index]
        summonerspells = [participant['summoner1Id'],participant['summoner2Id']]
        return summonerspells
    
    def get_type(self):
        return self.match_dto['info']['gameMode']
    
    def get_duration(self):
        return str(timedelta(seconds=self.match_dto['info']['gameDuration'])) #does this work?
    
def get_match_tl(region,match_id):
    return lol_watcher.match.timeline_by_match(region,match_id)

#All of the below could possibly become methods of a Match TL object

def get_cs(match_tl,minute:int,puuid:str):
    player = match_tl['metadata']['participants'].index(puuid)+1
    cs_at = match_tl['info']['frames'][minute]['participantFrames'][f'{player}']['minionsKilled']
    return(cs_at)

def get_frames(match_tl):
    duration = len(match_tl['info']['frames'])
    frames = []
    for i in range(duration):
        frames.append(i)
    return(frames)

def total_delta_CS(match_tl,puuid:str):
    frames = get_frames(match_tl)
    cs = {}
    for frame in frames: 
        cs_at = get_cs(match_tl=match_tl,minute=frame,puuid=puuid)
        delta_cs = cs_at-get_cs(match_tl=match_tl,minute=frame-1,puuid=puuid)
        cs[str(frame)] = delta_cs
    cs["0"] = 0
    return(cs)

def total_problem_delta_CS(match_tl,puuid:str,target=4):
    frames = get_frames(match_tl)
    cs = {}   
    for frame in frames: 
        cs_at = get_cs(match_tl=match_tl,minute=frame,puuid=puuid)
        delta_cs = cs_at-get_cs(match_tl=match_tl,minute=frame-1,puuid=puuid)
        if frame > 2 and delta_cs < target:
            cs[str(frame)] = delta_cs
    cs["0"] = 0
    return(cs)

#everything below is just for testing delete in final build

#test = Match('NA1_4665213017','envoker','na1').get_summoner_spells()
#test = Match('NA1_4665213017','envoker','na1').get_summoner_list()
#test = Match('NA1_4665213017','envoker','na1').get_kda()
#test = Match('NA1_4665213017','envoker','na1').get_type()
#test = Match('NA1_4665213017','envoker','na1').get_duration()
#

match = Match('NA1_4665213017','envoker','na1')

match_tl = get_match_tl('na1','NA1_4665213017')

puuid = summoner = Summoner('na1','Envoker').get_puuid()

def problem_delta_cs(match_id,puuid,type,region='na1'):
    #matchlist needs to return outcome (maybe not, might be a pain), and champion
    match_tl = get_match_tl(match_id=match_id,region=region) #could find a way to move this outside the function using state hooks and stuff
    duration = len(match_tl['info']['frames'])
    cspm = round(get_cs(match_tl=match_tl,minute=14,puuid=puuid)/(duration-1),1)
    if duration < 15:
        cs_15 = get_cs(match=match_tl,minute=15,puuid=puuid)
    else:
        cs_15 = 'Too Short'
    delta_cs = total_delta_CS(match_tl,puuid) 
    problem_cs = total_problem_delta_CS(match_tl,puuid) 
    cs_results = {
        'id':match_id,
        #'outcome':
        #'champion':
        'cspm': cspm,
        'type':type,
        'cs15':cs_15,
        'delta cs': delta_cs,
        'problem cs':problem_cs,
    }
    return cs_results

test2 = problem_delta_cs(match_id='NA1_4670747465',puuid=puuid,type='Normal',region='na1')
print(test2)