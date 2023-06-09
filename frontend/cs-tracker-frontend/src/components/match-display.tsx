import React from 'react';
import './components-styles.css';

function GameItem(){
    return(
        <div className='game-item'>
           <div className='content'>
                <div className='match-stats'>
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
                
            </div>
        </div>
    )
}