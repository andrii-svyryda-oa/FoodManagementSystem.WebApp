import { createApi } from "@reduxjs/toolkit/query/react";
import { createApiBaseOptions } from "./base.api";
import {
  UserBalanceUpdate,
  UserCreate,
  UserModel,
  UserUpdate,
} from "@/types/user";
import {
  normalizeUserResponse,
  normalizeUsersResponse,
} from "../normalizers/user.normalizers";
import { PaginatedData, PaginationData } from "@/types/common";

const USERS_TAG = "Users Tag";

export const userApi = createApi({
  ...createApiBaseOptions("users"),
  tagTypes: [USERS_TAG],
  endpoints: (builder) => ({
    getUsers: builder.query<PaginatedData<UserModel>, PaginationData>({
      query: (params: PaginationData) => ({
        url: "/",
        params,
      }),
      transformResponse: normalizeUsersResponse,
      providesTags: [USERS_TAG],
    }),
    getUser: builder.query<UserModel, string>({
      query: (userId: string) => `/${userId}`,
      transformResponse: normalizeUserResponse,
    }),
    addUser: builder.mutation({
      query: (newUser: UserCreate) => ({
        url: "/",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: [USERS_TAG],
    }),
    deleteUser: builder.mutation({
      query: (userId: string) => ({
        url: `/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: [USERS_TAG],
    }),
    updateUser: builder.mutation({
      query: (updateUser: UserUpdate) => ({
        url: "/",
        method: "PUT",
        body: updateUser,
      }),
      invalidatesTags: [USERS_TAG],
    }),
    updateUserBalance: builder.mutation({
      query: (updateUserBalance: UserBalanceUpdate) => ({
        url: `/${updateUserBalance.userId}/update-balance`,
        method: "PUT",
        body: updateUserBalance,
      }),
      invalidatesTags: [USERS_TAG],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useAddUserMutation,
  useDeleteUserMutation,
  useGetUserQuery,
  useUpdateUserBalanceMutation,
  useUpdateUserMutation,
} = userApi;
