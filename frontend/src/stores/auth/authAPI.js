import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

export const authAPI = createApi({
  reducerPath: "authAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => {
        return {
          url: `/user/register`,
          method: "POST",
          body: data,
        };
      },
    }),
    login: builder.mutation({
      query: (data) => {
        return {
          url: `/user/login`,
          method: "POST",
          body: data,
        };
      },
    }),
    getUser: builder.query({
      query: () => ({ url: `/user`, method: "GET" }),
      // Adding caching configuration
      providesTags: ["User"],
    }),
    getUsersInfoFromWallet: builder.query({
      query: (queryParams) => {
        let query = ''
        if (queryParams?.length > 0) {
          query = queryParams.map(address => {
            return `walletAddresses=${address}`
          }).join('&')
          query = `?${query}`
        }
        return { url: `/user/wallets${query}`, method: "GET" }
      },
      // Adding caching configuration
    })
  }),
});

export const { useRegisterMutation, useLoginMutation, useGetUserQuery, useGetUsersInfoFromWalletQuery } =
  authAPI;
