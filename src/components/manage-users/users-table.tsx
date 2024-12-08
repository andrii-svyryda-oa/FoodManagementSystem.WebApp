import { useGetUsersQuery } from "@/store/api/user.api";
import { PaginationData } from "@/types/common";
import { UserModel } from "@/types/user";
import { dateTimeFormat } from "@/utils/date.utils";
import { Input, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { Moment } from "moment";
import { useState } from "react";
import { SearchInput } from "../search-input/search-input";

const columns: ColumnsType<UserModel> = [
  {
    key: "id",
    title: "Id",
    dataIndex: "id",
  },
  {
    key: "email",
    title: "Email",
    dataIndex: "email",
  },
  {
    key: "name",
    title: "Name",
    dataIndex: "name",
  },
  {
    key: "balance",
    title: "Balance",
    dataIndex: "balance",
    render: (value: string) => `${value} UAH`,
  },
  {
    key: "createdAt",
    title: "Created At",
    dataIndex: "createdAt",
    render: (value: Moment) => value.format(dateTimeFormat),
  },
];

export const ManageUsersTable = ({}: {}) => {
  const [paginationData, setPaginationData] = useState<PaginationData>({
    page: 1,
    pageSize: 10,
    searchText: "",
  });

  const { data: paginatedUsers, isLoading } = useGetUsersQuery(paginationData);

  return (
    <>
      <SearchInput
        onChange={(searchText) => {
          setPaginationData({
            ...paginationData,
            searchText,
          });
        }}
      />
      <Table
        loading={isLoading}
        dataSource={paginatedUsers?.data}
        pagination={{
          total: paginatedUsers?.count,
          current: paginationData.page,
          pageSize: paginationData.pageSize,
          onChange: (page, pageSize) => {
            setPaginationData({ ...paginationData, page, pageSize });
          },
        }}
        columns={columns}
      />
    </>
  );
};
