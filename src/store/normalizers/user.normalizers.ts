import { PaginatedData } from "@/types/common";
import { UserModel } from "@/types/user";
import { dateTimeFormat } from "@/utils/date.utils";
import moment from "moment";

export const normalizeUserResponse = (userResponse: UserModel): UserModel => {
  return {
    ...userResponse,
    key: userResponse.id,
    createdAt: moment(userResponse.createdAt).format(dateTimeFormat),
  };
};

export const normalizeUsersResponse = (
  usersResponse: PaginatedData<UserModel>
): PaginatedData<UserModel> => {
  return {
    ...usersResponse,
    data: usersResponse.data.map(normalizeUserResponse),
  };
};
