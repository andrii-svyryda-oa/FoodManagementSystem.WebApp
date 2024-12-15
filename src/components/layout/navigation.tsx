"use client";

import { useUserInfoQuery } from "@/store/api/auth.api";
import { UserRole } from "@/types/auth";
import { getFilteredMenuItems, mapMenuItem } from "@/utils/navigation.utils";
import {
  ProfileOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Menu, Spin } from "antd";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    route: "/",
    Icon: ShoppingCartOutlined,
    label: "Orders",
  },
  {
    route: "/restaurants",
    Icon: ShopOutlined,
    label: "Restaurants",
    requiredRoles: [UserRole.Admin],
  },
  {
    route: "/manage-users",
    Icon: ProfileOutlined,
    label: "Manage users",
    requiredRoles: [UserRole.Admin],
  },
];

export const Navigation = () => {
  const pathname = usePathname();
  const { isLoading, data: userData } = useUserInfoQuery(null);

  return (
    <Spin spinning={isLoading}>
      <Menu
        theme="dark"
        className="!text-base"
        selectedKeys={[pathname]}
        items={getFilteredMenuItems(
          menuItems,
          userData?.role ?? UserRole.User
        ).map(mapMenuItem)}
      />
    </Spin>
  );
};
