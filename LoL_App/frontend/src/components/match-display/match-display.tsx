import React, {useState} from 'react'; ///do I need to do this?
///import { useGetMatchlistQuery } from '../../services/apiSlice';
import { useAppSelector} from '../../app/hooks'; 
import {useGetMatchInfoQuery} from '../../services/apiSlice';
import {getMatchIds} from '../../components/search/matchlistRequestSlice'
import {MatchItem} from '../../services/types/matchlist-types'

///so each div has a match ID as its value [key?]
///when a div is made, it sends a request to the API to get data for its data and 
///then sets a state to the result of making an api request for that specific ID's match data


///here set the match info to the result of calling for the match info for the given game id
const id='rtherhwea'///need to get the id from wherever it is stored.
const matchinfo = useGetMatchInfoQuery(id).data ///info should be a JS object pulled from the JSON resposne to the API call
const match:MatchItem = JSON.parse(matchinfo)
///need to add matchid, game duration,game type and whatever other info is on the matchitem type to the URL  
  

  function GameItem(props:any){
    return(
      <div className='game-item'>
        <div className='player-match-stats'>
          <div>Match ID: {match.match_id}</div>
          <div>Game Duration: {match.duration}</div>
          <div>Game Type: {match.game_type}</div>
          <div>KDA: {match.kda}</div>
          <div>CSPM </div>
        </div>
        <SummonerInfo></SummonerInfo>
      </div> 
      
  )
  }
function SummonerInfo(){
  return(
    match.summoners_list.map(summoner => (
      <div className='match-players' key={summoner.name}>
        <div>Items: {summoner.items}</div>
        <div>Summoner Spells: {summoner.spells}</div> 
        <div>KDA: {summoner.kda}</div>
      </div>
  ))
)}
  
export default function DisplayMatches(){
  /* Use a for loop to load a GameItem for the number of matches the user selects*/
  const ids = useAppSelector(getMatchIds) 
  ///should take an id from ids and generate a GameItem
  ///feed this into the game list div below
  
  function GameItems(){
    ids?.map((id)=>{
      GameItem(id)
    })
  } 
  
  return(
    <div className='match-display'> 
      <div className='summoner-info'>
        {/*This can probably be static. Just show name icon and rank*/}
      </div>
      <div className='game-list'>
      </div>
    </div>
  )
}