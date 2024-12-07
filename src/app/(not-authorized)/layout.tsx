import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { checkIsAuthorized } from "@/utils/auth";
import AuthorizedGate from "@/components/auth/authorized-gate";

export default async function OptionalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();

  const isAuthorized = await checkIsAuthorized(cookieStore.toString());

  if (isAuthorized) {
    return redirect("/");
  }

  return (
    <AuthorizedGate authRequired={false}>
      <div className="flex h-screen items-center justify-center">
        {children}
      </div>
    </AuthorizedGate>
  );
}
