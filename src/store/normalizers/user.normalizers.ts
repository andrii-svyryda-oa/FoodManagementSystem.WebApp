import { PaginatedData } from "@/types/common";
import { UserModel } from "@/types/user";
import { dateTimeFormat } from "@/utils/date.utils";
import moment from "moment";

export const normalizeUserResponse = (userResponse: any): UserModel => {
  return {
    ...userResponse,
    key: userResponse.id,
    createdAt: moment(userResponse.createdAt).format(dateTimeFormat),
  };
};

export const normalizeUsersResponse = (
  usersResponse: PaginatedData<any>
): PaginatedData<UserModel> => {
  return {
    ...usersResponse,
    data: usersResponse.data.map(normalizeUserResponse),
  };
};
