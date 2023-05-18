import { createSlice,PayloadAction} from '@reduxjs/toolkit'
import {MatchlistRequestState} from '../../services/types/matchlist-types'

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
  matchlistresponse:null
}

export const matchlistSlice = createSlice({
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
    setResponse:(state,action:PayloadAction<string>)=> {///The payload action needs to be a new type that is a destructured JSON api response.
      state.requesturl = action.payload
    },
}
})

///selectors
  ///need a selector for grabbing the url
  ///need a selector for grabbing the response to the url

///actions
export const {setRegion,setSummonername,setNumber,setUrl} = matchlistSlice.actions;

///reducers
export default matchlistSlice.reducer;
///I feel like there should be a way to use a selector to grab the whole slice instead of just individual values.

