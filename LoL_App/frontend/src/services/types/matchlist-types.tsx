export interface MatchlistRequestState {
  requestarray: {
    region:string|null,
    summonername:string|null,
    number:number|null    
    }
  requesturl: null | string,
  ///I think what I need instead of a string is another type that denatures the API response 
  ///then construct the response as an array of that type using Array<MatchInfo>
  matchlistresponse:null | string 
}

///https://redux-toolkit.js.org/rtk-query/usage-with-typescript
export interface SummonersList {
  name: string,
  kills: number,
  deaths: number,
  assists: number,
  kda: number,
  role: string | null
  champion: string
  items: Array<string|number>, ///might be an array of numbers I don't remember
  responseStatus: string | null /// is this needed?
}  

export interface Match {
  match_id: string,
  summoners_list: SummonersList
  responseStatus: string | null
} 

export interface MatchList {
  list: Match[],
  responseStatus: string | null ///how do I get the response status?
}