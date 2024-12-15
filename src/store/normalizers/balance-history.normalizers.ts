import { BalanceHistory } from "@/types/balance-history";
import { dateTimeFormat } from "@/utils/date.utils";
import moment from "moment";

export const normalizeBalanceHistoryResponse = (
  userResponse: BalanceHistory[]
): BalanceHistory[] => {
  return userResponse.map((history) => ({
    ...history,
    createdAt: moment(history.createdAt).format(dateTimeFormat),
  }));
};
