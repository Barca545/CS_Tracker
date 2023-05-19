import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {MatchlistRequestState} from './types/matchlist-types'///why did I need this?
import {} from '../components/search/matchlistRequestSlice' 

///make it so this returns a JSON of the form expected in matchlist-types (see below)
///On the back end, I may need to structure the data into a key,value pair first.
///https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#:~:text=RTK%20Query%20expects%20a%20baseQuery,to%20return%20such%20an%20object.
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl:'matchinfo/'}), ///how do I know what do use as the base URL?
  endpoints: (builder) => ({
    getMatchlist: builder.query({ ///the backend url for this will need to be changed. 
      ///Possibly use Axios to handle requests instead of fetchBaseQuery https://redux-toolkit.js.org/rtk-query/usage/customizing-queries and https://redux.js.org/tutorials/essentials/part-8-rtk-query-advanced 
      ///This makes it seem like I do: https://stackoverflow.com/questions/71978723/redux-toolkit-setting-initial-state-using-rtk-query.
      query: (url:string|null) => ({url:`${url}/`}) ///The target should become matchinfo/region/summoner/number/ and returns the ids of those past matches
    }),
    getMatchInfo: builder.query({
      ///how do I disambiguate the JSON into a MatchInfo type?
      query: (id:string|null) => ({url:`${id}/`}) ///The target should become matchinfo/id/ and returns the ids of those past matches
    }), 
  }),
})

export const {useGetMatchlistQuery,useGetMatchInfoQuery} = apiSlice