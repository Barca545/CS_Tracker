export interface MatchlistRequest{
  region: string|null,
  summonername:string|null,
  number:number|null,
}

export interface MatchlistRequestState {
  requestarray: MatchlistRequest
  requesturl: null | string,
  ///I think what I need instead of a string is another type that denatures the API response 
  ///then construct the response as an array of that type using Array<MatchInfo>
  matchlistids: Array<string>|null,
  matchlistresponse:null | string 
}

///https://redux-toolkit.js.org/rtk-query/usage-with-typescript
export interface SummonerStats {
  name:string,
  kills: number,
  deaths: number,
  assists: number,
  kda: number,
  role: string | null
  champion: string
  items: Array<number>
}

export interface SummonersList {
  summoner1: SummonerStats,
  summoner2: SummonerStats,
  summoner3: SummonerStats,
  summoner4: SummonerStats,
  summoner5: SummonerStats,
  summoner6: SummonerStats,
  summoner7: SummonerStats,
  summoner8: SummonerStats,
  summoner9: SummonerStats,
  summoner10: SummonerStats,
}  

export interface Match {
  match_id: string|null,
  summoners_list: SummonersList
} 

  export interface summoner {
    name:string|null,
    kills: number|null,
    deaths: number|null,
    assists: number|null,
    kda: number|null,
    role: string|null
    champion: string|null,
    items: Array<number>|null,
    spells:Array<string>|null,
  }

  export interface MatchItem {
    match_id: string|null,
    duration: string|number|null,///Idk what data type it is so update when I figure out
    game_type: string|null,
    kda: string|null, ///Should be the KDA of the summoner making the request
    cspm: number|null,
    summoners_list: Array<summoner>,
    responseStatus: string|null,
  }
