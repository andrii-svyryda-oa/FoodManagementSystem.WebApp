import { UserRole } from "@/types/auth";
import { MenuItem } from "@/types/common";
import Link from "next/link";

export const mapMenuItem = (menuItem: MenuItem) => ({
  key: menuItem.route ?? menuItem.label,
  label: menuItem.route ? (
    <Link className="text-lg" href={menuItem.route}>
      {menuItem.label}
    </Link>
  ) : (
    <a className="text-lg" onClick={menuItem.onClick}>
      {menuItem.label}
    </a>
  ),
  icon: <menuItem.Icon className="!text-lg" />,
  route: menuItem.route,
});

export const getFilteredMenuItems = (menuItems: MenuItem[], role: UserRole) => {
  return menuItems.filter(
    (item) => !item.requiredRoles?.length || item.requiredRoles.includes(role)
  );
};
