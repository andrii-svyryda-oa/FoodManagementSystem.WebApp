"use client";

import { useUserInfoQuery } from "@/store/api/auth.api";
import { UserRole } from "@/types/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthorizedGate({
  children,
  authRequired,
  requiredRoles = [],
}: Readonly<{
  children: React.ReactNode;
  authRequired: boolean;
  requiredRoles?: UserRole[];
}>) {
  const { isLoading, data, isError } = useUserInfoQuery(null);

  const router = useRouter();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (authRequired) {
      if (isError) {
        console.log("Navigate to login cause not logged in");
        router.push("/auth/login");
        return;
      }

      if (requiredRoles?.length && !requiredRoles.includes(data!.role)) {
        console.log("Navigate to main page cause not enough permissions");
        router.push("/");
        return;
      }
    }

    if (!authRequired && !isError) {
      console.log("Navigate to main page cause logged in");
      router.push("/");
      return;
    }
  }, [isLoading, router, data, isError]);

  return <>{children}</>;
}
