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
  const { error, isLoading, data } = useUserInfoQuery(null);

  const router = useRouter();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (authRequired) {
      if (!data) {
        router.push("/auth/login");
        return;
      }

      if (requiredRoles?.length && !requiredRoles.includes(data!.role)) {
        router.push("/");
        return;
      }
    }

    if (!authRequired && !error) {
      router.push("/");
      return;
    }
  }, [error, isLoading, router]);

  return <>{children}</>;
}
