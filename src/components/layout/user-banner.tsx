"use client";

import { useLogoutMutation, useUserInfoQuery } from "@/store/api/auth.api";
import { mapMenuItem } from "@/utils/navigation.utils";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Menu, Popover, Spin } from "antd";
import { profileNavigationMenuItems } from "./profile-navigation";

export const UserBanner = () => {
  const [logout] = useLogoutMutation();
  const { data: userData, isFetching } = useUserInfoQuery(null);

  return (
    <div className="flex space-x-3 items-center">
      <Popover
        content={
          <Menu
            className="!text-base"
            items={profileNavigationMenuItems(() => logout(null)).map(
              mapMenuItem
            )}
          />
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
      <div className="text-lg grow">
        <Spin spinning={isFetching}>{userData?.name}</Spin>
      </div>
      <div className="text-base text-gray-300">
        <Spin spinning={isFetching}>{userData?.balance} UAH</Spin>
      </div>
    </div>
  );
};
