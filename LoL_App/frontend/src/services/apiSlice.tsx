import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {MatchlistRequestState} from './types/matchlist-types'
///selector for the URL and response to the URL
import {} from '../components/search/matchlistSlice' 


///Can use this hook at the beginning of display/results to set the status of the component
///just change it so that request is just a string and the string's value is of request url from the other slice
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl:'matchlist/'}), ///how do I know what do use as the base URL?
  endpoints: (builder) => ({
    getMatchlist: builder.query({
      ///Do I not need to specifiy a type of AJAX request here? 
      ///This makes it seem like I do: https://stackoverflow.com/questions/71978723/redux-toolkit-setting-initial-state-using-rtk-query.
      ///Possibly use Axios to handle requests instead of fetchBaseQuery https://redux-toolkit.js.org/rtk-query/usage/customizing-queries and https://redux.js.org/tutorials/essentials/part-8-rtk-query-advanced 
      query: (url:string) => `${url}/` ///if I make this take a matchlistrequestSlice as an argument this would be a bit easier. But I do not know how to type it
    }), 
  }),
})

export const {useGetMatchlistQuery} = apiSlice