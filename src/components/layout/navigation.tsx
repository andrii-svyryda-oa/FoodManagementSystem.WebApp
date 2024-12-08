"use client";

import { useLogoutMutation } from "@/store/api/auth.api";
import { UserData, UserRole } from "@/types/auth";
import { Avatar, Layout, Menu, Popover } from "antd";
import { ReactNode } from "react";
import {
  LogoutOutlined,
  ProfileOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

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

const getFilteredMenuItems = (role: UserRole) => {
  return menuItems.filter(
    (item) => !item.requiredRoles?.length || item.requiredRoles.includes(role)
  );
};

export const Navigation = ({ role }: { role: UserRole }) => {
  const pathname = usePathname();

  console.log(pathname);

  return (
    <Menu
      theme="dark"
      className="!text-base"
      selectedKeys={[pathname]}
      items={getFilteredMenuItems(role).map((menuItem) => ({
        key: menuItem.route,
        label: <Link href={menuItem.route}>{menuItem.label}</Link>,
        icon: <menuItem.Icon />,
        route: menuItem.route,
      }))}
    />
  );
};
