import { configureStore } from "@reduxjs/toolkit";
import matchlistReducer from "../components/api/matchlistSlice";

const store =  configureStore({
    reducer:{
        matchlist:matchlistReducer
    }
})

export default store