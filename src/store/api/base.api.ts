import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const createApiBaseOptions = <T>(
  apiName: T
): { reducerPath: T; baseQuery: ReturnType<typeof fetchBaseQuery> } => ({
  reducerPath: apiName,
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_WEB_API_URL}/${apiName}/`,
    credentials: "include",
  }),
});
