import { PaginatedData } from "@/types/common";
import { UserModel } from "@/types/user";
import moment from "moment";

export const normalizeUserResponse = (userResponse: any): UserModel => {
  return {
    ...userResponse,
    createdAt: moment(userResponse.createdAt),
  };
};

export const normalizeUsersResponse = (
  userResponse: PaginatedData<any>
): PaginatedData<UserModel> => {
  return {
    ...userResponse,
    data: userResponse.data.map(normalizeUserResponse),
  };
};
