import { useGetUsersQuery } from "@/store/api/user.api";
import { PaginationData } from "@/types/common";
import { UserModel } from "@/types/user";
import { Button, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useCallback, useState } from "react";
import { AdjustUserBalanceModal } from "./modals/adjust-user-balance-modal";
import SearchInput from "../common/search-input";

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
  },
];

enum UserAction {
  Delete = "Delete",
  AdjustBalance = "AdjustBalance",
  Edit = "Edit",
  Add = "Add",
}

export const ManageUsersTable = () => {
  const [activeUser, setActiveUser] = useState<UserModel>();
  const [currentAction, setCurrentAction] = useState<UserAction>();

  const [paginationData, setPaginationData] = useState<PaginationData>({
    page: 1,
    pageSize: 10,
    searchText: "",
  });

  const { data: paginatedUsers, isLoading } = useGetUsersQuery(paginationData);

  const allColumns = columns.concat([
    {
      key: "action",
      title: "Action",
      render: (_, record) => (
        <div className="flex space-x-3">
          <Button
            onClick={() => {
              setActiveUser(record);
              setCurrentAction(UserAction.AdjustBalance);
            }}
          >
            Adjust balance
          </Button>
        </div>
      ),
    },
  ]);

  const onSearchChange = useCallback(() => {
    return (searchText: string) => {
      setPaginationData({
        ...paginationData,
        searchText,
      });
    };
  }, [setPaginationData, paginationData]);

  return (
    <>
      <SearchInput onChange={onSearchChange} />
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
        columns={allColumns}
      />
      <AdjustUserBalanceModal
        open={currentAction == UserAction.AdjustBalance}
        user={activeUser!}
        onCancel={() => setCurrentAction(undefined)}
      />
    </>
  );
};
