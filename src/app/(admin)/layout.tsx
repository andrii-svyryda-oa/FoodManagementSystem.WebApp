import AuthorizedGate from "@/components/auth/authorized-gate";
import { ApplicationLayout } from "@/components/layout/layout";
import { UserRole } from "@/types/auth";
// import { checkAuthentication } from "@/utils/auth.utils";
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";
import React from "react";

export default async function OptionalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const cookieStore = await cookies();

  // const userData = await checkAuthentication(cookieStore.toString());

  // if (!userData) {
  //   return redirect("/auth/login");
  // }

  // if (userData.role !== UserRole.Admin) {
  //   return redirect("/");
  // }

  return (
    <ApplicationLayout>
      <AuthorizedGate authRequired requiredRoles={[UserRole.Admin]}>
        {children}
      </AuthorizedGate>
    </ApplicationLayout>
  );
}
