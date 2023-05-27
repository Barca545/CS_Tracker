import React, {useState,useEffect} from 'react'; ///do I need to do this?
import {useAppSelector,useAppDispatch} from '../../app/hooks'; 
import {Match,MatchListState} from '../../services/types/matchlist-types'
import { recievedMatchList } from '../search/matchlistSlice';
import {useGetMatchlistQuery} from '../../services/apiSlice';
import {get} from '../../services/api';
import './match-display.css';

///so each div has a match ID as its value [key?]
///when a div is made, it sends a request to the API to get data for its data and 
///then sets a state to the result of making an api request for that specific ID's match data

///need to add matchid, game duration,game type and whatever other info is on the matchitem type to the URL  

///display matches border needs to expand with the length of the contents
export default function DisplayMatches(){
  const dispatch = useAppDispatch();
  const url = useAppSelector(state => state.matchlistrequest.requesturl)
  useEffect(() => {
    ///this needs to call the target URL not a static URL
    ///this needs to run every time a new search is executed
    get(url).then((matchlist) => {
      console.log(matchlist)///for debugging
      dispatch(recievedMatchList(matchlist));
    });
  }, []);
  const matchlist = useAppSelector(state => state.matchlist.matchlist)
  return(
    <div className='match-display'> 
      <div className='summoner-info'>
        {/*This can probably be static. Just show name icon and rank*/}
      </div>
      <div className='game-list'>
        {Object.values(matchlist).map(match => {
          return <GameItem match={match}/>
        })}
      </div>
    </div>) 
}  

function GameItem(props:any){
  const match:Match = props.match
  return(
    <details className='game-item'>
      <summary className='header-stats'>
        <div>Match ID: {match.id}</div>
        <div>Game Duration: {match.duration}</div>
        <div>Game Type: {match.game_type}</div>
        <div>KDA: {match.kda/*grab the info of the summoner we are looking for idk how*/}</div>
      </summary>
      <SummonerInfo match={match}/>
    </details>   
)}

function SummonerInfo(props:any){
  const match:Match= props.match
  return(
    <>{match.summoners_list.map(summoner => (
      <div className='match-players' key={summoner.name}>
        <div>Items: {summoner.items}</div>
        <div>Summoner Spells: {summoner.spells}</div> 
        <div>KDA: {summoner.kda}</div>
      </div>
  ))}</>
)}