import { useGetBalanceHistoryQuery } from "@/store/api/balance-history.api";
import { Spin, Timeline } from "antd";

export const BalanceHistoryTimeline = () => {
  const { data, isLoading } = useGetBalanceHistoryQuery(null);

  return (
    <div>
      {isLoading ? (
        <Spin />
      ) : (
        <Timeline
          items={data!.map((balanceHistory) => ({
            color: balanceHistory.difference > 0 ? "green" : "red",
            label: (
              <label className="text-base leading-4">
                {balanceHistory.createdAt}
              </label>
            ),
            children: (
              <label className="text-lg leading-6">{`${balanceHistory.details} (${balanceHistory.difference})`}</label>
            ),
          }))}
          reverse
          className="left-0 w-[600px] -ml-32"
          mode="left"
        />
      )}
    </div>
  );
};
