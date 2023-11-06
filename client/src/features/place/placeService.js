import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const placeService = createApi({
    reducerPath: 'places',
    tagTypes: ['places'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api/',
        prepareHeaders: (headers, { getState }) => {
            const reducers = getState();
            const token = reducers?.authReducer?.userToken;
            // console.log(token);
            headers.set('authorization', token ? `Bearer ${token}` : '');
            return headers;
        }
    }),
    endpoints: (builder) => {
        return {
            createPlace: builder.mutation({
                query: (placeData) => {
                    return {
                        url: 'create-place',
                        method: 'POST',
                        body: placeData
                    }
                },
                invalidatesTags: ['places']
            }),
            updatePlace: builder.mutation({
                query: data => {
                    return {
                        url: 'places',
                        method: 'PUT',
                        body: data
                    }
                },
                invalidatesTags: ['places']
            }),
            deletePlace: builder.mutation({
                query: id => {
                    return {
                        url: `delete-place/${id}`,
                        method: 'DELETE',

                    }
                },
                invalidatesTags: ['places']
            }),
            allPlaces: builder.query({
                query: () => {
                    return {
                        url: 'all-places',
                        method: 'GET'
                    }
                }
            }),

            getPlaces: builder.query({
                query: (page) => ({
                    url: `places/${page}`,
                    method: 'GET'
                }),
                providesTags: ['places']
            }),
            fetchPlace: builder.query({
                query: (id) => ({
                    url: `place/${id}`,
                    method: 'GET'
                }),
                providesTags: ['places']
            }),
        }
    }
});

export const {
    useCreatePlaceMutation,
    useGetPlacesQuery,
    useFetchPlaceQuery,
    useUpdatePlaceMutation,
    useDeletePlaceMutation,
    useAllPlacesQuery
} = placeService;

export default placeService;