import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api/user.api";
import { authApi } from "./api/auth.api";
import { balanceHistoryApi } from "./api/balance-history.api";
import { restaurantApi } from "./api/restaurant.api";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [balanceHistoryApi.reducerPath]: balanceHistoryApi.reducer,
    [restaurantApi.reducerPath]: restaurantApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(authApi.middleware)
      .concat(balanceHistoryApi.middleware)
      .concat(restaurantApi.middleware),
});

export default store;
