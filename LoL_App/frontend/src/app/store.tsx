import { configureStore } from "@reduxjs/toolkit";
import matchlistReducer from "../components/api/matchlistSlice";
///import thunkMiddleware from 'redux-thunk'; ///Used these solutions per other responses in this thread: https://stackoverflow.com/a/74857822 but they did not work.

const store =  configureStore({
    reducer:{
        matchlist:matchlistReducer
    },
    ///middleware: [thunkMiddleware],
})

export default store