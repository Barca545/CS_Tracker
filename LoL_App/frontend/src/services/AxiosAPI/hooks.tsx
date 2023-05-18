import {get} from './fetchers'
import {MatchList,Match} from '../types/types';

export function getMatchList(name:String, region:String, number:Number){
  let matches = {};
    
  const getMatches = async () => {
    const { list } = await get<MatchList>(`matchlist/${name}/${region}/${number}/`);///real url
    ///const { list } = await get<MatchList>('/matchlist/Envoker/na1/1/');
    matches = list;
    console.log(matches)
  }
  
  getMatches();
  return matches;
}