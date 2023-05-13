import {get} from '../fetchers/fetchers';
import {MatchList,Match} from '../types/types';


/// This should be as an argument props:any
export function useGetMatchList(region:String,name:String,number:Number){
  let matches = {}

  const getMatches = async () => {
  const { list } = await get<MatchList>(`matchlist/${name}/${region}/${number}/`);
  matches = list
  console.log(matches)
  }
  getMatches();
  return matches;
}