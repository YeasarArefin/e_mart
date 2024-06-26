import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        // baseUrl: 'http://localhost:3000/api'
        baseUrl: 'https://exclusive-mart.vercel.app/'
    }),
    tagTypes: ['Wishlists'],
    endpoints: (builder) => ({
        signUp: builder.mutation({
            query: (data) => ({
                url: '/signup',
                method: 'POST',
                body: data
            })
        }),
        verifyCode: builder.mutation({
            query: (data) => ({
                url: '/verify-code',
                method: 'POST',
                body: data
            })
        }),
        toggleWishlistsApi: builder.mutation({
            query: (data) => ({
                url: `/wishlists`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Wishlists']
        }),
        getWishLists: builder.query({
            query: (email) => `/wishlists?email=${email}&property=false`,
            keepUnusedDataFor: 300,
        }),
        getWishListsWithDetails: builder.query({
            query: (email) => `/wishlists?email=${email}&property=true`,
            keepUnusedDataFor: 300,
            providesTags: ['Wishlists']
        }),
    })
});
export const { useSignUpMutation, useVerifyCodeMutation, useToggleWishlistsApiMutation, useGetWishListsQuery, useGetWishListsWithDetailsQuery } = apiSlice;