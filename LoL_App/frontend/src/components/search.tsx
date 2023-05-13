import React, {useState,useEffect} from 'react';
import './components-styles.css'; /// possibly delete
/// delete react select from the project///
import {getMatchList} from '../components/api/hooks/use-queries'
///import { stringify } from 'querystring';


///Make selectNumber and selectRegion reset the selection value after they stop focusing the box. 
///onBlur does not seem to work
function SelectNumber(props:any){
  const [number,setNumber] = useState(props.number) ///make an option to put in a custom number 
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

function SelectName(props:any){
  const [name, setName] = useState('')
  return (<input 
    className="text" 
    type='select' 
    placeholder="Search Summoner..." 
    value={name}
    onChange={(e)=>setName(e.target.value)}/>)
}

///use the event handler functions + hooks to set the selection values then 
export default function SearchMatch(props:any){
  ///Use Redux (https://react-redux.js.org/using-react-redux/usage-with-typescript) to manage the state between parent and children commponents.
  ///Name/Region/Number can probably just be hooks but Matchlist should be redux
  
  ///const data  = useGetMatchList()
  ///if (data.length === 0 ) return null
  
  const handleSubmit = (region:string,name:string,number:number) => (e:any) =>{
    e.preventDefault();
    getMatchList(name,region,number)
  }

  return(
    <div className='searchBar'>
      <form>
        <span className='search-form-item'>
          <SelectName name={name}/>
        </span>
        <span className='search-form-item'>
          Show: <SelectNumber number={number}/>
        </span>
        <span className="search-form-item">
          Select Region <SelectRegion region={region}/>
        </span>
        <span className='search-form-item'> 
          <input type='submit' onSubmit={() => handleSubmit(name, region, number)}/> 
        </span>
      </form>
    </div>        
  )
}