import React, {useState,useContext} from "react";
import './App.css';
import SearchMatch from './components/search'
import DisplayMatches from './components/match-display'
import Results from './components/results'
import axios from "axios"
import {MatchesContext} from './contexts'

function App() {
  const matches = useContext(MatchesContext) /// this may need to just be converted back into a hook
  return (
    <div className="App">
      <MatchesContext.Provider value={matches}>
        <div className='header'>
          <SearchMatch matches={matches}/>
        </div>
        <div className='left'/>
        <div className='middle'>
          <DisplayMatches matches={matches}/>
        </div>
        <div className='right'/>
        <div className='footer'>
          <Results/>
        </div>
      </MatchesContext.Provider>
    </div>
  );
}
export default App;
