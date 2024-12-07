"use client";

import { useUserInfoQuery } from "@/store/api/auth.api";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthorizedGate({
  children,
  authRequired,
}: Readonly<{
  children: React.ReactNode;
  authRequired: boolean;
}>) {
  const { error, isLoading } = useUserInfoQuery({});

  const router = useRouter();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (authRequired && error) {
      router.push("/auth/login");
      return;
    }

    if (!authRequired && !error) {
      router.push("/");
      return;
    }
  }, [error, isLoading, router]);

  return <>{children}</>;
}
