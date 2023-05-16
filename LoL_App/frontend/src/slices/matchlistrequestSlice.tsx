import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../app/store'

export const matchlistrequestSlice = createSlice({
    name:'matchlistrequest',
    initialState:{
        region: '',
        summonername:'',
        number:1
    },   
    reducers: {
        setRegion: (state,action) => { 
            state.region = action.payload
        },
        setSummonername: (state,action) => {
            state.summonername = action.payload
        },
        setNumber: (state,action) => {
        state.number = action.payload
    },
    }
})

///actions
export const {setRegion,setSummonername,setNumber} = matchlistrequestSlice.actions

///reducers
export const selectRegion = (state:any) => state.region///is the state argument necessary here? Is it necesary to sa value here?
export const selectSummonername = (state:any) => state.summonername ///is the state argument necessary here? Is it necesary to sa value here?
export const selectNumber = (state:any) => state.number ///is the state argument necessary here? Is it necesary to sa value here?
///I feel like there should be a way to use a selector to grab the whole slice instead of just individual values.

export default matchlistrequestSlice.reducer