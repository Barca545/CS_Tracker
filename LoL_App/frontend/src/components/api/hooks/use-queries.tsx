import {get} from '../fetchers/fetchers';
import {MatchList,Match} from '../types/types';


///this needs to set MatchesContext to the JSON value.
export function getMatchList(region:String, summonername:String, number:Number){
  let matches = {};
    
  const getMatches = async () => {
    const { list } = await get<MatchList>(`matchlist/${summonername}/${region}/${number}/`);///real url
    ///const { list } = await get<MatchList>('/matchlist/Envoker/na1/1/');
    matches = list;
    console.log(matches)
  }

  getMatches();
  return matches;
}

