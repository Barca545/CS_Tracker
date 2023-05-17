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

export interface MatchlistRequest{
  region: string,
  summonername:string,
  number:number,
}