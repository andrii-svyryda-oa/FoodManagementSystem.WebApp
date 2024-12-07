import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ReduxProvider } from "@/hooks/useReduxProvider";
import { cookies } from "next/headers";

export default async function OptionalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();

  console.log(cookieStore.toString());

  return { children };
}
