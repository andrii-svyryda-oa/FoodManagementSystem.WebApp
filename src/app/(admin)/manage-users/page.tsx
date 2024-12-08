"use client";

import { ManageUsersTable } from "@/components/manage-users/users-table";

export default function ManageUsersPage() {
  return (
    <>
      <h2 className="text-3xl mt-0 mb-6">Users</h2>
      <ManageUsersTable />
    </>
  );
}
