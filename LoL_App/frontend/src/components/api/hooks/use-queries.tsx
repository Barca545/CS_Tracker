import {get} from '../fetchers/fetchers';
import {MatchList,Match} from '../types/types';


///this needs to set MatchesContext to the JSON value.

export const getMatchList = async (region:String, summonername:String, number:Number) => {
  ///unsure if this needs to be its own file.
  ///unsure if I should have the types this way? Isn't the result of an API call just JSON data?  
  const matchlist  = await get<MatchList>(`matchlist/${summonername}/${region}/${number}/`);
    return matchlist;
  }
