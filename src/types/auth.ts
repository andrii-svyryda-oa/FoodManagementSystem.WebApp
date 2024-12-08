export enum UserRole {
  Admin = 0,
  User = 1,
}

export type LoginPayload = {
  email: string;
  password: string;
};

export type UserData = {
  email: string;
  name: string;
  role: UserRole;
};
