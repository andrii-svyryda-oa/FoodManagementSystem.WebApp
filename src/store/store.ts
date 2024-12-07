import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api/user.api";
import { authApi } from "./api/auth.api";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(authApi.middleware),
});

export default store;
