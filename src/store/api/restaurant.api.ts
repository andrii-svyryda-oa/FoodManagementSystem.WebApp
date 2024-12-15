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
import {
  RestaurantCreate,
  RestaurantModel,
  RestaurantUpdate,
} from "@/types/restaurant";

const RESTAURANTS_TAG = "Restaurants Tag";

export const restaurantApi = createApi({
  ...createApiBaseOptions("restaurants"),
  tagTypes: [RESTAURANTS_TAG],
  endpoints: (builder) => ({
    getRestaurants: builder.query<
      PaginatedData<RestaurantModel>,
      PaginationData
    >({
      query: (params: PaginationData) => ({
        url: "/",
        params,
      }),
      providesTags: [RESTAURANTS_TAG],
    }),
    addRestaurant: builder.mutation({
      query: (newRestaurant: RestaurantCreate) => ({
        url: "/",
        method: "POST",
        body: newRestaurant,
      }),
      invalidatesTags: [RESTAURANTS_TAG],
    }),
    deleteRestaurant: builder.mutation({
      query: (restaurantId: string) => ({
        url: `/${restaurantId}`,
        method: "DELETE",
      }),
      invalidatesTags: [RESTAURANTS_TAG],
    }),
    updateRestaurant: builder.mutation({
      query: (updateRestaurant: RestaurantUpdate) => ({
        url: "/",
        method: "PUT",
        body: updateRestaurant,
      }),
      invalidatesTags: [RESTAURANTS_TAG],
    }),
  }),
});

export const {
  useAddRestaurantMutation,
  useDeleteRestaurantMutation,
  useUpdateRestaurantMutation,
  useGetRestaurantsQuery,
} = restaurantApi;
