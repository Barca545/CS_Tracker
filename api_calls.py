from dotenv import load_dotenv
import os
from riotwatcher import LolWatcher, ApiError


load_dotenv()

token = os.getenv('TOKEN')
#why does placing the value of token here not work?
lol_watcher = LolWatcher(f'{token}')

# testregion is 'na1'
#test matchid 4628282743

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
    def __init__(self,region:str,name:str):
        self.summonerInfo = lol_watcher.summoner.by_name(f'{region}', f'{name}')
        self.id = lol_watcher.summoner.by_name(f'{region}', f'{name}')['id']
        self.accountId =lol_watcher.summoner.by_name(f'{region}', f'{name}')['accountId']
        self.puuid = lol_watcher.summoner.by_name(f'{region}', f'{name}')['puuid']

#Envoker = Summoner('na1','Envoker')
#test match NA1_4628282743
Envoker_puuid = 'g1acCFkH_VkgESCpvkscbSiL_2UEuwZ-fyARdTryMHd71xDyXyiqXPishGrQUJh7h5pfFNj_SSRpWA'

def get_matches(puuid:str,region='na1',number=10):
    response = lol_watcher.match.matchlist_by_puuid(puuid=puuid,region=region,count=number)
    error_wrapper(response)

def get_match_tl(match_id:str, region='na1'):
    response = lol_watcher.match.timeline_by_match(region=region,match_id=match_id)
    error_wrapper(response)

#print(get_matches(puuid=Envoker_puuid,number=1))
#print(get_match_tl(match_id='NA1_4628282743'))

#def get_cs():
    # totalMinionsKilled

def get_cs(minute,participant,match_id:str):
    match = get_match_tl(match_id=match_id)
    #participants = match['metadata']['participants']
    print(type(match))
    
    
get_cs(1,1,match_id='NA1_4628282743')

