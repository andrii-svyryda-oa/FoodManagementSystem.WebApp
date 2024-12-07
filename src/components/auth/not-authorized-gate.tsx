"use client";
import type { Metadata } from "next";

export default function AuthorizedGate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
