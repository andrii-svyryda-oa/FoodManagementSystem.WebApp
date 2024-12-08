import { UserData } from "@/types/auth";

export const checkAuthentication = async (
  cookies?: string
): Promise<UserData | null> => {
  if (!cookies) {
    return null;
  }

  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_WEB_API_URL}/auth/user-info`,
      {
        headers: {
          Cookie: cookies,
        },
        credentials: "include",
      }
    );

    const userData = await result.json();

    if (userData.name) {
      return userData;
    }
  } catch {}

  return null;
};
