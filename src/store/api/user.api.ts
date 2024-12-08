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

export const userApi = createApi({
  ...createApiBaseOptions("users"),
  endpoints: (builder) => ({
    getUsers: builder.query<PaginatedData<UserModel>, PaginationData>({
      query: (params: PaginationData) => ({
        url: "/",
        params,
      }),
      transformResponse: normalizeUsersResponse,
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
    }),
    deleteUser: builder.mutation({
      query: (userId: string) => ({
        url: `/${userId}`,
        method: "DELETE",
      }),
    }),
    updateUser: builder.mutation({
      query: (updateUser: UserUpdate) => ({
        url: "/",
        method: "PUT",
        body: updateUser,
      }),
    }),
    updateUserBalance: builder.mutation({
      query: (updateUserBalance: UserBalanceUpdate) => ({
        url: `/${updateUserBalance.userId}`,
        method: "PUT",
        body: updateUserBalance,
      }),
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
