import { useUserInfoQuery } from "@/store/api/auth.api";
import { useGetBalanceHistoryQuery } from "@/store/api/balance-history.api";
import { useUpdateUserBalanceMutation } from "@/store/api/user.api";
import { UserBalanceUpdate, UserModel } from "@/types/user";
import { Form, Input, Modal, ModalProps } from "antd";
import { useForm } from "antd/es/form/Form";
import useNotification from "antd/es/notification/useNotification";

type Props = ModalProps & {
  user: UserModel;
};

export const AdjustUserBalanceModal = ({ user, ...modalProps }: Props) => {
  const [form] = useForm<UserBalanceUpdate>();
  const [notification, contextHolder] = useNotification();

  const { refetch: refetchBalanceHistory } = useGetBalanceHistoryQuery(null);
  const { data: userData } = useUserInfoQuery(null);

  const [updateUserBalance, { isLoading, isError }] =
    useUpdateUserBalanceMutation();

  const handleOk = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const payload = await form.validateFields();

    try {
      const result = await updateUserBalance({
        ...payload,
        difference: +payload.difference,
        userId: user.id,
      });

      if (!result?.error) {
        notification.success({
          message: "User balance adjusted successfully!",
        });
        modalProps.onCancel?.(e);

        if (user.id == userData!.id) {
          console.log("same user, refetching");
          refetchBalanceHistory();
        }
      }
    } catch {}
  };

  return (
    <Modal
      confirmLoading={isLoading}
      title="Adjust user balance"
      {...modalProps}
      onOk={handleOk}
    >
      {contextHolder}
      <Form layout="vertical" requiredMark={false} form={form}>
        <Form.Item
          name={"details"}
          label="Details"
          required
          rules={[
            { min: 3, message: "Details should be at least 3 symbols." },
            { max: 50, message: "Details should be at maximum 50 symbols." },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="difference"
          label="Difference to apply"
          required
          rules={[
            {
              validator: (_, value) => {
                if (value > -10000 && value < 10000) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  "Topping up balance or expense for more that 10k?"
                );
              },
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        {isError && (
          <div className="text-red">
            Some server error occurred. Try again later.
          </div>
        )}
      </Form>
    </Modal>
  );
};
