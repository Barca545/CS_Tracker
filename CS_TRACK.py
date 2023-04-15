from pandas import DataFrame as df
from pandas import concat
from api_calls import get_cs,get_match_tl,get_gametime

def delta_CS(match_id:str,region:str,puuid:str):
    match = get_match_tl(match_id=match_id,region=region)
    frames = get_gametime(match)
    cs_graph = []
    for frame in frames: 
        cs_at = get_cs(match=match,minute=frame,puuid=puuid)
        Δ_cs = cs_at-get_cs(match=match,minute=frame-1,puuid=puuid)
        cs_graph.append([frame,cs_at,Δ_cs])
    cs_graph = df(cs_graph,columns=['Time','CS@','ΔCSPM'])  
    cs_graph.at[0,'ΔCSPM'] = 0
    #why yield empty
    print(cs_graph)

Envoker_puuid = 'g1acCFkH_VkgESCpvkscbSiL_2UEuwZ-fyARdTryMHd71xDyXyiqXPishGrQUJh7h5pfFNj_SSRpWA'
delta_CS('NA1_4628282743','na1',Envoker_puuid) 

    #ignore the time from 0 to 1
   


