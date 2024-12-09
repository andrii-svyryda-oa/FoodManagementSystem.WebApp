"use client";

import ProfileNavigation from "@/components/layout/profile-navigation";

export default async function OptionalLayout({
  children,
}: Readonly<{
  children: any;
}>) {
  return (
    <div>
      <ProfileNavigation />
      {children}
    </div>
  );
}
