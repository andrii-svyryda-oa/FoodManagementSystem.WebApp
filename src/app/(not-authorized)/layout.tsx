// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";
// import { checkAuthentication } from "@/utils/auth.utils";
import AuthorizedGate from "@/components/auth/authorized-gate";

export default async function OptionalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const cookieStore = await cookies();

  // const userData = await checkAuthentication(cookieStore.toString());

  // if (userData) {
  //   return redirect("/");
  // }

  return (
    <AuthorizedGate authRequired={false}>
      <div className="flex h-screen items-center justify-center">
        {children}
      </div>
    </AuthorizedGate>
  );
}
