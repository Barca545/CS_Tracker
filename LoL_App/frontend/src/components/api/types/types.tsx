interface SummonersList {
  name: string,
  kills: number,
  deaths: number,
  assists: number,
  kda: number,
  role: string | null
  champion: string
  items: Array<string>, ///might be an array of numbers I don't remember
  responseStatus: string | null /// is this needed?
  }  

export interface Match {
  match_id: string,
  summoners_list: SummonersList
  responseStatus: string | null
  } 

export interface MatchList {
  list: Match[] | never,
  responseStatus: string | null
  }
 