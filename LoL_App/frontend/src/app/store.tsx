import { configureStore } from "@reduxjs/toolkit";
///import thunkMiddleware from 'redux-thunk'; ///Used these solutions per other responses in this thread: https://stackoverflow.com/a/74857822 but they did not work.
import {api} from '../services/api';

const store =  configureStore({
    reducer:{
        [api.reducerPath]: api.reducer,
    },
    middleware: (gDM) => gDM().concat(api.middleware), ///what does this line do?
})

export type RootState =  ReturnType<typeof store.getState>///what does this line do?