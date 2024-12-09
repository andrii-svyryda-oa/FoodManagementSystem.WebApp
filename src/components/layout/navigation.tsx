"use client";

import { UserRole } from "@/types/auth";
import { getFilteredMenuItems, mapMenuItem } from "@/utils/navigation.utils";
import {
  ProfileOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
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

export const Navigation = ({ role }: { role: UserRole }) => {
  const pathname = usePathname();

  return (
    <Menu
      theme="dark"
      className="!text-base"
      selectedKeys={[pathname]}
      items={getFilteredMenuItems(menuItems, role).map(mapMenuItem)}
    />
  );
};
