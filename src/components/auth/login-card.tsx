import { useLoginMutation } from "@/store/api/auth.api";
import { LoginPayload } from "@/types/auth";
import { Button, Card, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import useNotification from "antd/es/notification/useNotification";
import { useEffect } from "react";

export const LoginCard = () => {
  const [notification, contextHolder] = useNotification();

  const [login, { error, isLoading }] = useLoginMutation();

  useEffect(() => {
    if (error) {
      notification.error({ message: "Email or password incorrect" });
    }
  }, [error]);

  const [form] = useForm<LoginPayload>();

  return (
    <div>
      {contextHolder}
      <Card title="Login" bordered={false} style={{ width: 300 }}>
        <Form
          requiredMark={false}
          name="login"
          form={form}
          onFinish={login}
          layout="vertical"
        >
          <Form.Item
            label="Email"
            name="email"
            required
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email address!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            required
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button loading={isLoading} type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
