import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../config/config';

export const authAPI = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer token`);
      return headers;
    }
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => {
        return {
          url: `/signup`,
          method: 'POST',
          body: data,
        };
      },
    }),
    login: builder.mutation({
      query: (data) => {
        return {
          url: `/login`,
          method: 'POST',
          body: data,
        };
      },
    }),
  })
});

export const { useRegisterMutation, useLoginMutation } = authAPI;
