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
import { UserBanner } from "./user-banner";
import { Navigation } from "./navigation";

export const ApplicationLayout = ({
  children,
  userData,
}: {
  children: ReactNode;
  userData: UserData;
}) => {
  return (
    <Layout className="h-screen">
      <Layout.Sider width={300}>
        <div className="flex flex-col text-white py-6 px-1 justify-start h-full">
          <div className="px-5">
            <h1 className="m-0">FMS</h1>
            <p className="text-gray-400 m-0">Food Management System</p>
          </div>
          <div className="grow pt-4">
            <Navigation role={userData.role} />
          </div>
          <div className="px-5">
            <UserBanner username={userData.name} />
          </div>
        </div>
      </Layout.Sider>
      <Layout.Content className="h-screen overflow-y-auto">
        {children}
      </Layout.Content>
    </Layout>
  );
};
