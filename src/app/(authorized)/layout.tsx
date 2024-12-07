import AuthorizedGate from "@/components/auth/authorized-gate";
import { checkIsAuthorized } from "@/utils/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function OptionalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();

  const isAuthorized = await checkIsAuthorized(cookieStore.toString());

  if (!isAuthorized) {
    return redirect("/auth/login");
  }

  return <AuthorizedGate authRequired>{children}</AuthorizedGate>;
}
