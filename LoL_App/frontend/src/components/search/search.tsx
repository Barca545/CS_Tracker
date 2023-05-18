import {useState} from 'react';
/// delete react select from the project///
///import {useGetMatchlistQuery } from '../../services/apiSlice';
import {setUrl} from './matchlistSlice'
import {useAppDispatch} from '../../app/hooks';

export default function SearchMatch(){
  const dispatch = useAppDispatch();
  const [region,setRegion] = useState('na1')
  const [summonername,setSummonername] = useState('')
  const [number,setNumber] = useState(1)
  const [url,setNewUrl] = useState('')
  ///this is where I dispatch the action https://stackoverflow.com/a/70211326

  function handleSubmit(){
    ///e.preventDefault(); ///is this necesary?
    setNewUrl(`${region}/${summonername}/${number}/`);
    dispatch(setUrl(url));
    console.log(url)
  }
  ///need to add logic to the submit button to reset the fields.
  return(
      <div className='searchBar'>
        <form>
          <span className='search-form-item'>
          <input 
            className="text" 
            type='select' 
            placeholder="Search Summoner..." 
            value={summonername}
            onChange={(e)=>setSummonername(e.target?.value)}/>
          </span>
          <span className='search-form-item'>
            <select className='number-of-selector' value={region} onChange={(e)=>setRegion(e.target?.value)}> 
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
            <select className='number-of-selector' value={number} onChange={(e)=>setNumber(parseInt(e.target?.value))} > 
              <option value={1}>Most recent</option>
              <option value={5}>Past five</option>
              <option value={10}>Past ten</option>
              <option value={20}>Past twenty</option>
            </select>
          </span>
          <span className='search-form-item'> 
            <input type={'button'} value={'Search'} onClick={()=>handleSubmit()}/>
          </span>
        </form>
      </div>           
  )
}