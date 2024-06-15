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
      providesTags: (result, error, arg) => [{ type: "User", id: "LIST" }],
    }),
    getUsersInfoFromWallet: builder.query({
      query: (queryParams) => {
        let query = "";
        if (queryParams?.length > 0) {
          query = queryParams
            .map((address) => {
              return `walletAddresses=${address}`;
            })
            .join("&");
          query = `?${query}`;
        }
        return { url: `/user/wallets${query}`, method: "GET" };
      },
      // Adding caching configuration
    }),

    updateRole: builder.mutation({
      query: (data) => {
        return {
          url: `/user/update-role`,
          method: "PUT",
          body: data,
        };
      },
    }),
    banUser: builder.mutation({
      query: (data) => {
        return {
          url: `/user/ban/${data.userWallet}`,
          method: "PUT",
          body: {},
        };
      },
    }),

    requestReset: builder.mutation({
      query: (data) => {
        return {
          url: `/user/request-reset`,
          method: "POST",
          body: data,
        };
      },
    }),

    resetPassword: builder.mutation({
      query: (data) => {
        return {
          url: `/user/reset-password`,
          method: "PATCH",
          body: data,
        };
      },
    }),

    updateProfile: builder.mutation({
      query: (data) => {
        return {
          url: `/user/update-profile`,
          method: "PATCH",
          body: data,
        };
      },
    }),

    changePassword: builder.mutation({
      query: (data) => {
        return {
          url: `/user/change-password`,
          method: "PATCH",
          body: data,
        };
      },
    }),

    unbanUser: builder.mutation({
      query: (data) => {
        return {
          url: `/user/unban/${data.userWallet}`,
          method: "PUT",
          body: {},
        };
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetUserQuery,
  useGetUsersInfoFromWalletQuery,
  useUpdateRoleMutation,
  useBanUserMutation,
  useUnbanUserMutation,
  useRequestResetMutation,
  useResetPasswordMutation,
  useUpdateProfileMutation,
  useChangePasswordMutation
} = authAPI;
