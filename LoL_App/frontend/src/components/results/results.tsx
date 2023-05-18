import React from 'react';
///possibly just import this into the display (or vice versa) instead of importing both separately
export default function Results(){
  return(
    <div className='results-wrapper'>
      <div className='results-header'>Results</div>
      <div className='cs-15'> CS@15: </div>
      <div className='problem-cs'>Problem Minutes: </div>
      <div className='results-graph'></div>
    </div>
  )
}