import {get} from './fetchers'
import {MatchList} from '../../services/types/matchlist-types';

export const getMatches = async (url:string|null) => {
  if (url !== null) {
    const { list } = await get<MatchList>(`matchlist/${url}`);///real url
    ///const { list } = await get<MatchList>('/matchlist/atmost/na1/1/');
    return list;
  }
  else {return null
  }
}