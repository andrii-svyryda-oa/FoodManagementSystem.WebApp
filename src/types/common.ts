export type PaginatedData<T> = {
  data: T[];
  count: number;
};

export type PaginationData = {
  page: number;
  pageSize: number;
  searchText: string;
};
