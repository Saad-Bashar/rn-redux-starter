import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_KEY = "2a93b15e-0aee-4770-8ba7-b25dbc4083a6"

interface Breed {
    id: string
    name: string
    image: {
        url: string
    }
}

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.thedogapi.com/v1',
        prepareHeaders(headers) {
            headers.set('x-api-key', API_KEY)
            return headers
        }
    }),
    endpoints(builder) {
        return {
            fetchBreeds: builder.query<Breed[], number | void>({
                query (limit = 10) {
                    return `/breeds?limit=${limit}`
                }
            })
        }
    }
})

export const { useFetchBreedsQuery } = apiSlice