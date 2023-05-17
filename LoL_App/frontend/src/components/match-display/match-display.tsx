import React from 'react'; ///do I need to do this?
import { useGetMatchlistQuery } from '../../services/apiSlice';

function GameItem(){
  ///next step is figuring out how to destructure the JSON that results from the API request.
  ///I do not need to use the selectors in the search since they are setting the value but I need to use them here to access
    ///const region = useAppSelector(state => state.matchlistrequest.region)
    ///const summonername = useAppSelector(state => state.matchlistrequest.summonername)
    ///const number = useAppSelector(state => state.matchlistrequest.number)
    ///const {data, isLoading,isSuccess, isError, error} = useGetMatchlistQuery<MatchlistRequest>([]) 
  return(
    <div className='game-item'>
      <div className='content'>
        <div className='player-match-stats'>
          {/*Show type, duration, champion, items, summoners, KDA, CSPM*/}
        </div>
        <div className='match-players'>
          {/* Show all the players in the match*/}
        </div>
      </div>     
    </div>
  )
}

export default function DisplayMatches(){
  /* Use a for loop to load a GameItem for the number of matches the user selects*/ 
  return(
    <div className='match-display'> 
      <div className='summoner-info'>
        {/*This can probably be static. Just show name icon and rank*/}
      </div>
      <div className='game-list'>
        <GameItem/>
      </div>
    </div>
  )
}