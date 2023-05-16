import React, {useState,useContext, useEffect} from "react";
import './App.css';
import SearchMatch from './components/search'
import DisplayMatches from './components/match-display'
import Results from './components/results'
import { useDispatch } from "react-redux";
import matchlistReducer from "./components/api/matchlistSlice";


function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMatchlist())
  }, [dispatch])

  const contents = useSelector((state) => state.content.contents)
  const isLoading = useSelector((state) => state.content.isLoading)
  const error = useSelector((state) => state.content.error)

  
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
