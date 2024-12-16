import { useGetRestaurantsQuery } from "@/store/api/restaurant.api";
import { PaginationData } from "@/types/common";
import { RestaurantModel } from "@/types/restaurant";
import { Button, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useCallback, useState } from "react";
import SearchInput from "../common/search-input";

const columns: ColumnsType<RestaurantModel> = [
  {
    key: "id",
    title: "Id",
    dataIndex: "id",
  },
  {
    key: "name",
    title: "Name",
    dataIndex: "name",
  },
  {
    key: "description",
    title: "Description",
    dataIndex: "description",
  },
];

enum RestaurantAction {
  Delete = "Delete",
  Edit = "Edit",
  Add = "Add",
}

export const ManageRestaurantsTable = () => {
  const [activeRestaurant, setActiveRestaurant] = useState<RestaurantModel>();
  const [currentAction, setCurrentAction] = useState<RestaurantAction>();

  console.log(activeRestaurant, currentAction);

  const [paginationData, setPaginationData] = useState<PaginationData>({
    page: 1,
    pageSize: 10,
    searchText: "",
  });

  const { data: paginatedRestaurants, isFetching } =
    useGetRestaurantsQuery(paginationData);

  const allColumns = columns.concat([
    {
      key: "action",
      title: "Action",
      render: (_, record) => (
        <div className="flex space-x-3">
          <Button
            type="primary"
            onClick={() => {
              setActiveRestaurant(record);
              setCurrentAction(RestaurantAction.Edit);
            }}
          >
            Edit
          </Button>
          <Button
            onClick={() => {
              setActiveRestaurant(record);
              setCurrentAction(RestaurantAction.Delete);
            }}
          >
            Delete
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
      <div className="flex items-end justify-between mb-4">
        <SearchInput onChange={onSearchChange} />
        <Button
          type="primary"
          onClick={() => setCurrentAction(RestaurantAction.Add)}
        >
          Add
        </Button>
      </div>
      <Table
        loading={isFetching}
        dataSource={paginatedRestaurants?.data}
        pagination={{
          total: paginatedRestaurants?.count,
          current: paginationData.page,
          pageSize: paginationData.pageSize,
          onChange: (page, pageSize) => {
            setPaginationData({ ...paginationData, page, pageSize });
          },
        }}
        columns={allColumns}
      />
      {/* <AdjustUserBalanceModal
        open={currentAction == RestaurantAction.Add}
        restaurant={activeRestaurant!}
        onCancel={() => setCurrentAction(undefined)}
      /> */}
    </>
  );
};
