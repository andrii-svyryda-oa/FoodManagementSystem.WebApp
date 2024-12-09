import { useLogoutMutation } from "@/store/api/auth.api";
import { mapMenuItem } from "@/utils/navigation.utils";
import {
  DollarOutlined,
  LogoutOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { usePathname } from "next/navigation";
import React from "react";

export const profileNavigationMenuItems = (logout: () => void) => [
  {
    route: "/profile",
    label: "Profile",
    Icon: MailOutlined,
  },
  {
    route: "/profile/balance-history",
    label: "Balance history",
    Icon: DollarOutlined,
  },
  {
    label: "Logout",
    Icon: LogoutOutlined,
    onClick: logout,
  },
];

const ProfileNavigation: React.FC = () => {
  const pathname = usePathname();

  const [logout] = useLogoutMutation();

  return (
    <Menu
      className="bg-transparent mb-6"
      selectedKeys={[pathname]}
      mode="horizontal"
      items={profileNavigationMenuItems(() => logout(null)).map(mapMenuItem)}
    />
  );
};

export default ProfileNavigation;
