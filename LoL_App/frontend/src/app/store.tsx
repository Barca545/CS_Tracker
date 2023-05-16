import { configureStore } from "@reduxjs/toolkit";
import {apiSlice} from '../services/apiSlice';
import { matchlistrequestSlice } from "../slices/matchlistrequestSlice";

/// try installing a logger for easier debugging: https://github.com/LogRocket/redux-logger

const store =  configureStore({
    reducer:{
        [apiSlice.reducerPath]: apiSlice.reducer,
        matchlistrequest: matchlistrequestSlice.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
})

export type RootState =  ReturnType<typeof store.getState>///what does this line do?
export default store