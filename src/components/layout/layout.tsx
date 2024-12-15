"use client";

import { Layout } from "antd";
import { ReactNode } from "react";
import { Navigation } from "./navigation";
import { UserBanner } from "./user-banner";
import { useUserInfoQuery } from "@/store/api/auth.api";
import { UserRole } from "@/types/auth";

export const ApplicationLayout = ({ children }: { children: ReactNode }) => {
  const { data: userData } = useUserInfoQuery(null);

  return (
    <Layout className="h-screen">
      <Layout.Sider width={300}>
        <div className="flex flex-col text-white py-6 px-1 justify-start h-full">
          <div className="px-5">
            <h1 className="m-0 text-3xl">FMS</h1>
            <p className="text-gray-400 m-0 text-lg">Food Management System</p>
          </div>
          <div className="grow pt-4">
            <Navigation role={userData?.role ?? UserRole.User} />
          </div>
          <div className="px-5">
            <UserBanner
              username={userData?.name ?? ""}
              balance={userData?.balance ?? 0}
            />
          </div>
        </div>
      </Layout.Sider>
      <Layout.Content className="h-screen overflow-y-auto p-6">
        {children}
      </Layout.Content>
    </Layout>
  );
};
