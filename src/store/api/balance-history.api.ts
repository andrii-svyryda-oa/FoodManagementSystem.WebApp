import { BalanceHistory } from "@/types/balance-history";
import { createApi } from "@reduxjs/toolkit/query/react";
import { normalizeBalanceHistoryResponse } from "../normalizers/balance-history.normalizers";
import { createApiBaseOptions } from "./base.api";

export const BALANCE_HISTORY_TAG = "Users Tag";

export const balanceHistoryApi = createApi({
  ...createApiBaseOptions("balance-history"),
  tagTypes: [BALANCE_HISTORY_TAG],
  endpoints: (builder) => ({
    getBalanceHistory: builder.query<BalanceHistory[], null>({
      query: () => ({
        url: "/",
      }),
      providesTags: [BALANCE_HISTORY_TAG],
      transformResponse: normalizeBalanceHistoryResponse,
    }),
  }),
});

export const { useGetBalanceHistoryQuery } = balanceHistoryApi;
