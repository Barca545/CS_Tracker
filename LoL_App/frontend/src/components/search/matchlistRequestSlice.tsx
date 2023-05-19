import { createSlice,PayloadAction} from '@reduxjs/toolkit'
import {MatchlistRequestState} from '../../services/types/matchlist-types'
import { RootState } from '../../app/store'
import {useGetMatchlistQuery} from '../../services/apiSlice'

///I can import the api call here and save its value in the request's state
  ///I could probably just save the url here and throw it to an axios 
  ///function than save the response in the response state instead of 
  ///having to go through the tedious process of doing this in Redux.

const initialState: MatchlistRequestState = {
  requestarray:{
    region:null,
    summonername:null,
    number:null},
  requesturl: null,
  matchlistids: null,
  matchlistresponse:null
}

export const matchlistRequestSlice = createSlice({
  name:'matchlistrequest',
  initialState,   
  reducers: {
    setRegion: (state,action:PayloadAction<string>) => { 
      state.requestarray.region = action.payload
    },
    setSummonername: (state,action:PayloadAction<string>) => {
      state.requestarray.summonername = action.payload
    },
    setNumber: (state,action:PayloadAction<number>) => {
      state.requestarray.number = action.payload
    },
    setUrl: (state,action:PayloadAction<string>) => {
      state.requesturl = action.payload
    },
    setMatchIds:(state,action:PayloadAction<Array<string>>)=> {///The payload action needs to be a new type that is a destructured JSON api response.
      state.matchlistids = action.payload
    },
}
})

///selectors
export function getRequestUrl(state:RootState){///the matchlist slice versus the request slice might need to be a distinct one
  const url = state.matchlistrequest.requesturl
  ///this needs to be in a component. 
  ///Maybe I call it in search and then dispatch the result to the matchlist
  if (url !==null){
    const matchlist = useGetMatchlistQuery(url).data 
    console.log(matchlist)
  }
  else {return null}
}

export function getMatchIds(state:RootState){
  const ids = state.matchlistrequest.matchlistids  
  return ids
}

///actions
export const {setRegion,setSummonername,setNumber,setUrl} = matchlistRequestSlice.actions;

///reducers
export default matchlistRequestSlice.reducer;
///I feel like there should be a way to use a selector to grab the whole slice instead of just individual values.

