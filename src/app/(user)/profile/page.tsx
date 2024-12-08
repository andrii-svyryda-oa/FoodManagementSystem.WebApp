"use client";

import { useLogoutMutation } from "@/store/api/auth.api";
import Image from "next/image";

export default function ProfilePage() {
  const [logout] = useLogoutMutation();

  return <></>;
}
