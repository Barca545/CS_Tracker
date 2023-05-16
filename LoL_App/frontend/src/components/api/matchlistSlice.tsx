import { createAsyncThunk,createSlice } from '@reduxjs/toolkit';
import axios from 'axios'

export const fetchMatchlist = createAsyncThunk(
  'matchlist/fetchMatchlist',
  async (request:Array<string|number>) => {
    const res  = await axios.get(`matchlist/${request[0]}/${request[1]}/${request[2]}/`)
    const data = await res.data
    return data;
  }
)

const initialState = {
  contents: [],
  isLoading: false,
  error: '',
}

export const matchlistSlice = createSlice({
    name:'matchlist',
    initialState,
    reducers: {},
    extraReducers:(builder) => {
      builder.addCase(fetchMatchlist.pending, (state) => {
        state.isLoading = true 
      })
      builder.addCase(fetchMatchlist.fulfilled, (state,action) => {
        state.isLoading = false
        state.contents = action.payload
      })
      builder.addCase(fetchMatchlist.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message!
    })
  }
})

///Are these necesary? From https://dev.to/ifeanyichima/what-is-createasyncthunk-in-redux--mhe
export const selectMatchlist = (state:any) => state.matchlist.contents
export const getMatchlistStatus = (state:any) => state.matchlist.status
export const getMatchlistError = (state:any) => state.matchlist.error

export default matchlistSlice.reducer