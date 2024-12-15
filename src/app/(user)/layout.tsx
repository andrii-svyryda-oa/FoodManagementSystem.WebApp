import AuthorizedGate from "@/components/auth/authorized-gate";
import { ApplicationLayout } from "@/components/layout/layout";
import { checkAuthentication } from "@/utils/auth.utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function OptionalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();

  const userData = await checkAuthentication(cookieStore.toString());

  if (!userData) {
    return redirect("/auth/login");
  }

  return (
    <ApplicationLayout userData={userData}>
      <AuthorizedGate authRequired>{children}</AuthorizedGate>
    </ApplicationLayout>
  );
}
