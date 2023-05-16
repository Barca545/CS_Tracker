import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { useSelector } from 'react-redux'
import {selectRegion,selectSummonername,selectNumber} from '../slices/matchlistrequestSlice'

///might need to make and import types in the types file.


export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl:'/csapi'}), ///how do I know what do use as the base URL?
    endpoints: (builder) => ({
        getMatchlist: builder.query({
            ///Do I not need to specifiy a type of AJAX request here? 
            ///This makes it seem like I do: https://stackoverflow.com/questions/71978723/redux-toolkit-setting-initial-state-using-rtk-query.
            ///Possibly use Axios to handle requests instead of fetchBaseQuery https://redux-toolkit.js.org/rtk-query/usage/customizing-queries and https://redux.js.org/tutorials/essentials/part-8-rtk-query-advanced 
            query: () => `matchlist/${useSelector(selectRegion)}/${useSelector(selectSummonername)}/${useSelector(selectNumber)}/` ///if I make this take a matchlistrequestSlice as an argument this would be a bit easier. But I do not know how to type it
        }), 
    }),
})

export const {useGetMatchlistQuery} = apiSlice