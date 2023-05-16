import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
    baseQuery: fetchBaseQuery({baseUrl:''}),
    reducerPath: 'csApi',
    endpoints: (build) => ({
        getMatchlist: build.query({
            query: (request) => `matchlist/${request[0]}/${request[1]}/${request[2]}/`
        }),
    }),
})

export const {useGetMatchlistQuery} = api