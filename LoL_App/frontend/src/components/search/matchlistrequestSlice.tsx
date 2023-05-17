import { createSlice,PayloadAction} from '@reduxjs/toolkit'

///move into a singular types file
export interface MatchlistRequestState {
    region: string,
    summonername:string,
    number:number,
}

const initialState: MatchlistRequestState = {
    region: '',
    summonername:'',
    number:1,
}

export const matchlistrequestSlice = createSlice({
    name:'matchlistrequest',
    initialState,   
    reducers: {
      setRegion: (state,action:PayloadAction<string>) => { 
        state.region = action.payload
      },
      setSummonername: (state,action:PayloadAction<string>) => {
        state.summonername = action.payload
      },
      setNumber: (state,action:PayloadAction<number>) => {
        state.number = action.payload
    },
  }
})

///actions
export const {setRegion,setSummonername,setNumber} = matchlistrequestSlice.actions;

///reducers
export default matchlistrequestSlice.reducer;
///I feel like there should be a way to use a selector to grab the whole slice instead of just individual values.

