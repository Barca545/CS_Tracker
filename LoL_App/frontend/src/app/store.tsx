import { configureStore } from "@reduxjs/toolkit";
import {apiSlice} from '../services/apiSlice';
import  matchlistrequestreducer from "../components/search/matchlistSlice";
import { combineReducers } from '@reduxjs/toolkit'

///try installing a logger for easier debugging: https://github.com/LogRocket/redux-logger

const store =  configureStore({
  reducer:{
    [apiSlice.reducerPath]: apiSlice.reducer,
    matchlistrequest: matchlistrequestreducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
})

 
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store