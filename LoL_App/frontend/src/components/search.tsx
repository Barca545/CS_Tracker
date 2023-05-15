import {useState,useContext} from 'react';
import './components-styles.css'; /// possibly delete
/// delete react select from the project///
import {getMatchList} from '../components/api/hooks/use-queries'
///import { stringify } from 'querystring';

export default function SearchMatch(){
  const [summonername, setName] = useState('')
  ///Make selectNumber and selectRegion reset the selection value after they stop focusing the box. 
  ///onBlur does not seem to work
  const [region,setRegion] = useState('na1') ///NA is the default value does it show up this way? Eventually make it so it shows "Select Region" then add if/else logic to make it prompt the user to put in a region if they do not change it. 
  ///Made these numbers instead of strings. Might cause an issue if other portions of the code are expecting strings — MUST CONFIRM.
  ///make an option to put in a custom number 
  const [number,setNumber] = useState(1)
  
  const handleSubmit = (region:string,summonername:string,number:number) => (e:any) =>{
    ///should this be in the handle submit? 
    ///const data  = useGetMatchList()
    ///if (data.length === 0 ) return null
    e.preventDefault();
    console.log(summonername,region,number)
    getMatchList(summonername,region,number)
  }

  return(
    <div className='searchBar'>
      <form>
        <span className='search-form-item'>
        <input 
          className="text" 
          type='select' 
          placeholder="Search Summoner..." 
          value={summonername}
          onChange={(e)=>setName(e.target.value)}/>
        </span>
        <span className='search-form-item'>
          <select className='number-of-selector' value={region} onChange={(e:any) => setRegion(e.target.value)}> 
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
          </select>
        </span>
        <span className="search-form-item">
          <select className='number-of-selector' value={number} onChange={(e:any) => setNumber(e.target.value)} > 
            <option value={1}>Most recent</option>
            <option value={5}>Past five</option>
            <option value={10}>Past ten</option>
            <option value={20}>Past twenty</option>
          </select>
        </span>
        <span className='search-form-item'> 
          <input type='submit' onSubmit={() => handleSubmit(region,summonername,number)}/> 
        </span>
      </form>
    </div>        
  )
}