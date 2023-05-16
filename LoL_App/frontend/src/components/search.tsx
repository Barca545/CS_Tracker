import {useState} from 'react';
import './components-styles.css'; /// possibly delete
/// delete react select from the project///
import { useGetMatchlistQuery } from '../services/apiSlice';
import {useDispatch,useSelector} from 'react-redux';
import {setRegion,setSummonername,setNumber,selectRegion,selectSummonername,selectNumber} from '../slices/matchlistrequestSlice'


export default function SearchMatch(){
  const dispatch = useDispatch();
  ///Make selectNumber and selectRegion reset the selection value after they stop focusing the box. 
  ///onBlur does not seem to work
  ///make an option to put in a custom number 
  
  const handleSubmit = () => {
    ///e.preventDefault();
    
    ///this block seems really ineficcient is there really no way to just import the whoel state?
    const region = useSelector(selectRegion)
    const summonername = useSelector(selectSummonername)
    const number = useSelector(selectNumber)
    const request = [region,summonername,number]

    const {data, isLoading,isSuccess, isError, error} = useGetMatchlistQuery(request)
    ///need to use booleans to control what it returns based on the value of getDefaultMiddleware.
    console.log('test')
    console.log(data)
  }
  return(
      <div className='searchBar'>
        <form>
          <span className='search-form-item'>
          <input 
            className="text" 
            type='select' 
            placeholder="Search Summoner..." 
            onChange={(e)=>setSummonername(e.target.value)}/>
          </span>
          <span className='search-form-item'>
            <select className='number-of-selector' onChange={(e:any) => setRegion(e.target.value)}> 
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
            <select className='number-of-selector' onChange={(e:any) => setNumber(e.target.value)} > 
              <option value={1}>Most recent</option>
              <option value={5}>Past five</option>
              <option value={10}>Past ten</option>
              <option value={20}>Past twenty</option>
            </select>
          </span>
          <span className='search-form-item'> 
            <input type='submit' onSubmit={() => handleSubmit()}/>  
          </span>
        </form>
      </div>
           
  )
}