"use client";

import { useLogoutMutation } from "@/store/api/auth.api";
import { UserData, UserRole } from "@/types/auth";
import { Avatar, Layout, Menu, Popover } from "antd";
import { ReactNode } from "react";
import {
  LogoutOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";

export const UserBanner = ({ username }: { username: string }) => {
  const [logout] = useLogoutMutation();

  return (
    <div className="flex space-x-3 items-center">
      <Popover
        content={
          <Menu className="!text-base">
            <Menu.Item icon={<ProfileOutlined className="!text-lg" />} key="1">
              <Link href={"/profile"}>Profile</Link>
            </Menu.Item>
            <Menu.Item icon={<LogoutOutlined className="!text-lg" />} key="2">
              <a onClick={logout}>Logout</a>
            </Menu.Item>
          </Menu>
        }
        overlayClassName="rounded-xl"
        overlayInnerStyle={{
          padding: 2,
        }}
        trigger="hover"
        placement="bottom"
      >
        <Avatar className="bg-gray-500" size="large" icon={<UserOutlined />} />
      </Popover>
      <div className="text-lg">{username}</div>
    </div>
  );
};
