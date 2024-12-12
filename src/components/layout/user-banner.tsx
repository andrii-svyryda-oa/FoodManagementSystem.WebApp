"use client";

import { useLogoutMutation } from "@/store/api/auth.api";
import { mapMenuItem } from "@/utils/navigation.utils";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Menu, Popover } from "antd";
import { profileNavigationMenuItems } from "./profile-navigation";

export const UserBanner = ({
  username,
  balance,
}: {
  username: string;
  balance: number;
}) => {
  const [logout] = useLogoutMutation();

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
      <div className="text-lg grow">{username}</div>
      <div className="text-base text-gray-300">{balance} UAH</div>
    </div>
  );
};
