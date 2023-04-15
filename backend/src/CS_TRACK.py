from pandas import DataFrame as df
from backend.src.api_calls import get_cs,get_match_tl,get_gametime

#delete these when done with testing
test_match = get_match_tl(match_id='NA1_4628282743')
Envoker_puuid = 'g1acCFkH_VkgESCpvkscbSiL_2UEuwZ-fyARdTryMHd71xDyXyiqXPishGrQUJh7h5pfFNj_SSRpWA'

def total_delta_CS(match,puuid:str):
    frames = get_gametime(match)
    cs_graph_ls = []
    for frame in frames: 
        cs_at = get_cs(match=match,minute=frame,puuid=puuid)
        Δ_cs = cs_at-get_cs(match=match,minute=frame-1,puuid=puuid)
        cs_graph_ls.append([frame,cs_at,Δ_cs])
    cs_graph = df(cs_graph_ls,columns=['Time','CS@','ΔCSPM'])  
    cs_graph.at[0,'ΔCSPM'] = 0
    return(cs_graph)

def problem_delta_CS(match,puuid:str,target=4):
    frames = get_gametime(match)
    cs_graph_ls = []   
    for frame in frames: 
        cs_at = get_cs(match=match,minute=frame,puuid=puuid)
        Δ_cs = cs_at-get_cs(match=match,minute=frame-1,puuid=puuid)
        if frame > 2 and Δ_cs < target:
            cs_graph_ls.append([frame,cs_at,Δ_cs])
    cs_graph = df(cs_graph_ls,columns=['Time','CS@','ΔCSPM'])  
    cs_graph.at[0,'ΔCSPM'] = 0
    return(cs_graph)

def cs_15(match,puuid):
    return get_cs(match=match,minute=15,puuid=puuid)

print(total_delta_CS(test_match,Envoker_puuid))
print(problem_delta_CS(test_match,Envoker_puuid))
print(cs_15(test_match,Envoker_puuid))
   


