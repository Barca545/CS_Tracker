import { createSlice,PayloadAction} from '@reduxjs/toolkit'
import {MatchList} from '../../services/types/matchlist-types'
import { RootState } from '../../app/store'
///import {useGetMatchlistQuery} from '../../services/apiSlice'

///port the functionality for grabing a match from match-display to here. Not urgent.
///dispatch setMatchList in search set it equal to const matchlist:MatchList = JSON.parse(useGetMatchlistQuery(url).data)
///use a selector to grab info for each specific match based on the matchid

const initialState: MatchList = {
  list:[],
  responseStatus: null}

export const Matchlist = createSlice({
  name: 'matchlist',
  initialState:initialState,
  reducers:{ 
    setMatchList: (state,action:PayloadAction<MatchList>) => {
      state = action.payload 
    },
  }
})
