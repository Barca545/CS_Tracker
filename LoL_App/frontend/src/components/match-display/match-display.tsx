import React, {useState} from 'react'; ///do I need to do this?
import { useAppSelector} from '../../app/hooks'; 
import {useGetMatchInfoQuery,useGetMatchlistQuery} from '../../services/apiSlice';
import {getMatchIds,getRequestUrl} from '../../components/search/matchlistRequestSlice'
import {MatchItem,MatchList} from '../../services/types/matchlist-types'

///so each div has a match ID as its value [key?]
///when a div is made, it sends a request to the API to get data for its data and 
///then sets a state to the result of making an api request for that specific ID's match data

///need to add matchid, game duration,game type and whatever other info is on the matchitem type to the URL  
export default function DisplayMatches(){
  ///const ids = useAppSelector(getMatchIds)
  const url = useAppSelector(getRequestUrl)
  if (url != null) {
    const matchlist:MatchList = JSON.parse(useGetMatchlistQuery(url).data)
    return(
      <div className='match-display'> 
        <div className='summoner-info'>
          {/*This can probably be static. Just show name icon and rank*/}
        </div>
        <div className='game-list'>
          {matchlist.list.map(matchitem => {
            return <GameItem matchitem={matchitem}/>
          })}
        </div>
      </div>) 
  }
else return (<></>)
}  

function GameItem(props:any){
  const matchitem:MatchItem = props.matchitem
  return(
    <div className='game-item'>
      <div className='header-stats'>
        <div>Match ID: {matchitem.match_id}</div>
        <div>Game Duration: {matchitem.duration}</div>
        <div>Game Type: {matchitem.game_type}</div>
        <div>KDA: {matchitem.kda/*grab the info of the summoner we are looking for idk how*/}</div>
        <div>CSPM: {matchitem.cspm/*grab the info of the summoner we are looking for idk how*/} </div>
      </div>
      <div className='more-info'> {/*show only onClick make everything inside it appear in a column*/}
        <SummonerInfo matchitem={matchitem}/>
      </div>
    </div>   
)}

function SummonerInfo(props:any){
  const matchitem:MatchItem = props.matchitem
  return(
    <>{matchitem.summoners_list.map(summoner => (
      <div className='match-players' key={summoner.name}>
        <div>Items: {summoner.items}</div>
        <div>Summoner Spells: {summoner.spells}</div> 
        <div>KDA: {summoner.kda}</div>
      </div>
  ))}</>
)}