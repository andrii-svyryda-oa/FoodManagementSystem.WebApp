import { UserRole } from "./auth";
import { ShoppingCartOutlined } from "@ant-design/icons";

export type PaginatedData<T> = {
  data: T[];
  count: number;
};

export type PaginationData = {
  page: number;
  pageSize: number;
  searchText: string;
};

export type MenuItem = {
  requiredRoles?: UserRole[];
  route?: string;
  onClick?: () => void;
  label: string;
  Icon: typeof ShoppingCartOutlined;
};
