import React, {useState} from 'react'; ///do I need to do this?
///import { useGetMatchlistQuery } from '../../services/apiSlice';
import { useAppSelector} from '../../app/hooks'; 
import {useGetMatchInfoQuery} from '../../services/apiSlice';
import {getMatchIds} from '../../components/search/matchlistRequestSlice'

///so each div has a match ID as its value 
///when a div is made, it sends a request to the API to get data for its data and 
///then sets a state to the result of making an api request for that specific ID's match data

function GameItem(id:string){
  ///const matchinfo = useGetMatchInfoQuery(id)
  ///here set the match info to the result of calling for the match info for the given game id
  const info = useGetMatchInfoQuery(id) ///info should be a JS object pulled from the JSON resposne to the API call
  return(
    <div className='game-item'>
      <div className='content'>
        <div className='player-match-stats'>
          <div>Summoner Name: {}</div>
          <div>Game Duration: {}</div>
          <div>Game Type: {}</div>
          <div>Summoner Spells: {}</div>
          <div>KDA: {}</div>
        </div>
        <div className='match-players'>{/* Make this div expand onClick*/}
          <div>Items: {}</div>
          <div>CSPM: {}</div>
        </div>
      </div>     
    </div>
  )
}

export default function DisplayMatches(){
  /* Use a for loop to load a GameItem for the number of matches the user selects*/
  const ids = useAppSelector(getMatchIds) 
  ///should take an id from ids and generate a GameItem
  ///feed this into the game list div below
  const GameItems = ids?.map(()=>{})

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