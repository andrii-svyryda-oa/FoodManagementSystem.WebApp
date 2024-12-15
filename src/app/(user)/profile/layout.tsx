"use client";

import ProfileNavigation from "@/components/layout/profile-navigation";

export default async function OptionalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <ProfileNavigation />
      {children}
    </div>
  );
}
