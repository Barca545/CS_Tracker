import { configureStore } from "@reduxjs/toolkit";
import {apiSlice} from '../services/apiSlice';
import  matchlistRequestReducer from "../components/search/matchlistRequestSlice";
import { combineReducers } from '@reduxjs/toolkit'
import matchlistReducer from "../components/search/matchlistSlice";

///try installing a logger for easier debugging: https://github.com/LogRocket/redux-logger

export const store =  configureStore({
  reducer:{
    [apiSlice.reducerPath]: apiSlice.reducer,
    matchlistrequest: matchlistRequestReducer,
    matchlist:matchlistReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
})

 
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store