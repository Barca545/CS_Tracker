import axios from "axios"
import React, {useState,useEffect} from 'react';
import './components-styles.css'; /// possibly delete
/// delete react select from the project///


///Make selectNumber and selectRegion reset the selection value after they stop focusing the box. 
///onBlur does not seem to work

function SelectNumber(props:any){
  const [number,setNumber] = useState(props.number)    
  return(
    <select className='number-of-selector' onChange={(e:any) => setNumber(e.target.value)} value={number}> 
      <option value='1'>Most recent</option>
      <option value='5'>Past five</option>
      <option value='10'>Past ten</option>
      <option value='20'>Past twenty</option>
    </select>)}

function SelectRegion(props:any){
  const [region,setRegion] = useState(props.region)    
  return(
    <select className='number-of-selector' onChange={(e:any) => setRegion(e.target.value)} value={region}> 
      <option value='na1'>NA</option>
      <option value='kr'>KR</option>
      <option value='oc1'>OCE</option>
      <option value='euw1'>EUW</option>
      <option value='eun1'>EUNE</option>
      <option value='br1'>BR</option>
      <option value='jp1'>JP</option>
      <option value='la1'>LA1</option>
      <option value='la2'>LA2</option>
      <option value='tr1'>TR</option>
      <option value='ph2'>PH</option>
      <option value='sg2'>SG</option>
      <option value='th2'>TH</option>
      <option value='tw2'>TW</option>
      <option value='vn2'>VN</option>
    </select>)}

///use the event handler functions + hooks to set the selection values then 
///onsubmit call the getMatches function with name,number,region as args
export default function SearchMatch(props:any){
  const [matches, setMatches] = useState(props.matches)
  const [name, setName] = useState('')
  var number = 1
  var region = 'na1'
  /// figure out why this is void
  ///can try adding void to the approved types here LoL_App\frontend\src\components\search.tsx if nothing else succeeds but I do not think that is the problem
  /// possible solution here: https://github.com/axios/axios/issues/1510
  
  function getMatches(name:string,region:string,number:any){
    axios({
      method: 'GET',
      url:`matchlist/${name}/${region}/${number}/`
    }).then((response:any)=>{
        const matchlist = response.data
        setMatches(matchlist)
        console.log('success')///just for testing
    }).catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
          } 
        })}
  return(
    <div className='searchBar'>
      <form>
        <span className='search-form-item'>
          <input 
            className="text" 
            type='select' 
            placeholder="Search Summoner..." 
            value={name}
            onChange={(e)=>setName(e.target.value)}/>
        </span>
        <span className='search-form-item'>
          Show: <SelectNumber number={number}/>
        </span>
        <span className="search-form-item">
          Select Region <SelectRegion region={region}/>
        </span>
        <span className='search-form-item'> 
          <input type='submit'onSubmit={getMatches(name,region,number)}/>
        </span>
      </form>
    </div>        
  )
}