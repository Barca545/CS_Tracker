import { createSlice,PayloadAction} from '@reduxjs/toolkit'
import {Match,MatchListState} from '../../services/types/matchlist-types'
import { RootState } from '../../app/store'
///import {useGetMatchlistQuery} from '../../services/apiSlice'


///use the getmathchlistquery to get the matchlist and store it as the state
///use a selector to grab info for each specific match based on the matchid

const initialState: MatchListState = {
  match_id: null,
  summoners_list:{
    summoner1: {
      name:null,
      kills: null,
      deaths: null,
      assists: null,
      kda: null,
      role: null,
      champion:null,
      items: null,
    },
    summoner2: {
      name:null,
      kills: null,
      deaths: null,
      assists: null,
      kda: null,
      role: null,
      champion:null,
      items: null,
    },
    summoner3: {
      name:null,
      kills: null,
      deaths: null,
      assists: null,
      kda: null,
      role: null,
      champion:null,
      items: null,
    },
    summoner4: {
      name:null,
      kills: null,
      deaths: null,
      assists: null,
      kda: null,
      role: null,
      champion:null,
      items: null,
    },
    summoner5: {
      name:null,
      kills: null,
      deaths: null,
      assists: null,
      kda: null,
      role: null,
      champion:null,
      items: null,
    },
    summoner6: {
      name:null,
      kills: null,
      deaths: null,
      assists: null,
      kda: null,
      role: null,
      champion:null,
      items: null,
    },
    summoner7: {
      name:null,
      kills: null,
      deaths: null,
      assists: null,
      kda: null,
      role: null,
      champion:null,
      items: null,
    },
    summoner8: {
      name:null,
      kills: null,
      deaths: null,
      assists: null,
      kda: null,
      role: null,
      champion:null,
      items: null,
    },
    summoner9: {
      name:null,
      kills: null,
      deaths: null,
      assists: null,
      kda: null,
      role: null,
      champion:null,
      items: null,
    },
    summoner10: {
      name:null,
      kills: null,
      deaths: null,
      assists: null,
      kda: null,
      role: null,
      champion:null,
      items: null,
    }
  },
  responseStatus: null}

export const Matchlist = createSlice({
  name: 'matchlist',
  initialState:initialState,
  reducers:{ 
    setMatchinfo: (state,action:PayloadAction<MatchListState>) => {
      state = action.payload ///I need to make sure the payload is the match ID tho how do I do that?
    },
  }
})
