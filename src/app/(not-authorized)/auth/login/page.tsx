"use client";

import { useLoginMutation, useUserInfoQuery } from "@/store/api/auth.api";
import { LoginPayload } from "@/types/auth";
import { Button, Card, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import useNotification from "antd/es/notification/useNotification";
import { useEffect } from "react";

export default function Home() {
  const [notification] = useNotification();
  const { data: userInfo } = useUserInfoQuery({});

  console.log(userInfo);
  const [login, result] = useLoginMutation();

  useEffect(() => {
    if (result.error) {
      notification.error({ message: "Email or password incorrect" });
    }
  }, [result.error]);

  const [form] = useForm<LoginPayload>();

  return (
    <div>
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
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}