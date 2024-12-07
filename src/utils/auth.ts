export const checkIsAuthorized = async (cookies?: string) => {
  if (!cookies) {
    return false;
  }
  console.log(process.env.NEXT_PUBLIC_WEB_API_URL);

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
      return true;
    }
  } catch (e) {
    console.log(e);
  }

  return false;
};
