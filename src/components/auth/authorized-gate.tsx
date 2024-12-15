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
  const { isLoading, data } = useUserInfoQuery(null);

  const router = useRouter();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (authRequired) {
      if (!data) {
        console.log("Navigate to login cause no data");
        router.push("/auth/login");
        return;
      }

      if (requiredRoles?.length && !requiredRoles.includes(data!.role)) {
        console.log("Navigate to main page cause not enough permissions");
        router.push("/");
        return;
      }
    }

    if (!authRequired && data) {
      console.log("Navigate to main page cause login");
      router.push("/");
      return;
    }
  }, [isLoading, router]);

  return <>{children}</>;
}
