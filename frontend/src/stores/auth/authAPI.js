import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

export const authAPI = createApi({
  reducerPath: "authAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer token`);
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
      providesTags: ['User'],
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useGetUserQuery } = authAPI;
