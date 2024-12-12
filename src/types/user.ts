import { UserRole } from "./auth";

type UserBase = {
  id: string;
  name: string;
  email: string;
};

export type UserCreate = UserBase & {
  role: UserRole;
};

export type UserUpdate = UserBase & {};

export type UserBalanceUpdate = {
  userId: string;
  details: string;
  difference: number;
};

export type UserModel = UserBase & {
  role: UserRole;
  createdAt: string;
  balance: number;
  key: string;
};
