import { createApi } from "@reduxjs/toolkit/query/react";
import { createApiBaseOptions } from "./base.api";
import { LoginPayload, UserData } from "@/types/auth";

export const USER_INFO_TAG = "USER_INFO";

export const authApi = createApi({
  ...createApiBaseOptions("auth"),
  tagTypes: [USER_INFO_TAG],
  endpoints: (builder) => ({
    userInfo: builder.query<UserData, null>({
      query: () => ({
        url: "/user-info",
        credentials: "include",
      }),
      providesTags: [USER_INFO_TAG],
    }),
    login: builder.mutation({
      query: (LoginPayload: LoginPayload) => ({
        url: "/login",
        method: "POST",
        body: LoginPayload,
        credentials: "include",
      }),
      invalidatesTags: [USER_INFO_TAG],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: [USER_INFO_TAG],
    }),
  }),
});

export const { useLoginMutation, useUserInfoQuery, useLogoutMutation } =
  authApi;
