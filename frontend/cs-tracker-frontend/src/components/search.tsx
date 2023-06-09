import React, {useState } from 'react';
import './components-styles.css'; /// possibly delete
/// delete react select from the project///

function SelectNumber(){
    const [currentValue,setCurrentValue] = useState('Select...')
    function handleChange(newValue:any){setCurrentValue(newValue)}
    return(
        <select className='number-of-selector' onChange={(e:any) => handleChange(e.target.value)} value={currentValue}> 
            <option value='select'>Select...</option>
            <option value='1'>1</option>
            <option value='5'>5</option>
            <option value='10'>10</option>
            <option value='20'>20</option>
        </select>)}

export default function SearchMatch(){
    
    /// make it reset the selection value after they stop focusing the box. onBlur does not seem to work///

    return(
        <div className='searchBar'>
            <form>
                <span className='search-form-item'>
                    <input className="search-input" type='select' placeholder="Search Summoner..." />
                </span>
                <span className='search-form-item'>
                    {'Show past: '} <SelectNumber/> {'matches.'}
                </span>
                <span className='search-form-item'> 
                    <input type='submit'/>
                </span>
            </form>
        </div>        
    )
}