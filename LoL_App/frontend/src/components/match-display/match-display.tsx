import React, {useState} from 'react'; ///do I need to do this?
///import { useGetMatchlistQuery } from '../../services/apiSlice';
import { useAppSelector} from '../../app/hooks'; 
import {useGetMatchInfoQuery} from '../../services/apiSlice';
import {getMatchIds} from '../../components/search/matchlistRequestSlice'
import {MatchItem} from '../../services/types/matchlist-types'

///so each div has a match ID as its value [key?]
///when a div is made, it sends a request to the API to get data for its data and 
///then sets a state to the result of making an api request for that specific ID's match data

///need to add matchid, game duration,game type and whatever other info is on the matchitem type to the URL  
  
export default function DisplayMatches(){
  const ids = useAppSelector(getMatchIds)
  if (Array.isArray(ids)){
    return(
      <div className='match-display'> 
        <div className='summoner-info'>
          {/*This can probably be static. Just show name icon and rank*/}
        </div>
        <div className='game-list'>
          {ids.map(id => {
            return <GameItem id={id}/>
          })}
        </div>
      </div>) 
  }
}  

function GameItem(props:any){
  const id = props.id///need to get the id from wherever it is stored.
  const rawmatchinfo = useGetMatchInfoQuery(id).data ///info should be a JS object pulled from the JSON resposne to the API call
  const matchinfo:MatchItem = JSON.parse(rawmatchinfo)

  function SummonerInfo(){
    return(
      matchinfo.summoners_list.map(summoner => (
        <div className='match-players' key={summoner.name}>
          <div>Items: {summoner.items}</div>
          <div>Summoner Spells: {summoner.spells}</div> 
          <div>KDA: {summoner.kda}</div>
        </div>
    ))
  )}

  return(
    <div className='game-item'>
      <div className='header-stats'>
        <div>Match ID: {matchinfo.match_id}</div>
        <div>Game Duration: {matchinfo.duration}</div>
        <div>Game Type: {matchinfo.game_type}</div>
        <div>KDA: {matchinfo.kda/*grab the info of the summoner we are looking for idk how*/}</div>
        <div>CSPM: {matchinfo.cspm/*grab the info of the summoner we are looking for idk how*/} </div>
      </div>
      <div className='more-info'> {/*show only onClick make everything inside it appear in a column*/}
        <SummonerInfo/>
      </div>
    </div> 
    
)}