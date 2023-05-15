import React, {useState,useContext} from "react";
import './App.css';
import SearchMatch from './components/search'
import DisplayMatches from './components/match-display'
import Results from './components/results'

function App() {
  return (
    <div className="App">
      <div className='header'>
        <SearchMatch/>
      </div>
      <div className='left'/>
      <div className='middle'>
        <DisplayMatches/>
      </div>
      <div className='right'/>
      <div className='footer'>
        <Results/>
      </div>
    </div>
  );
}
export default App;
