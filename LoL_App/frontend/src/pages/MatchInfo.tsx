///this page needs to be connected to the router and then connected to the show more details button
import React from "react";
import {useAppSelector,useAppDispatch} from '../app/hooks'; 


const MatchInfo = () => {
    const matchinfo = useAppSelector(state => state.matchinfo.matchinfo)
    return(
    <>
      <h1>Match Info</h1>
      <div className='match-id'>Match ID: </div>
      <div className='cs-15'> CS@15: </div>
      <div className='problem-cs'>Problem Minutes:</div>
      <details>
        <summary>show CS at each minute</summary>
      </details>
    </>
  )
}
export default MatchInfo