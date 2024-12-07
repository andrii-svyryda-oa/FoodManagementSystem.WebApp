import { createApi } from "@reduxjs/toolkit/query/react";
import { createApiBaseOptions } from "./base.api";
import { UserBalanceUpdate, UserCreate, UserUpdate } from "@/types/user";

export const userApi = createApi({
  ...createApiBaseOptions("users"),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/",
    }),
    getUser: builder.query({
      query: (userId: string) => `/${userId}`,
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
