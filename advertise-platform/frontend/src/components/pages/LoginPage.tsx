import { Button, Checkbox, Flex, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export const LoginPage = ({ setCurrentUser }) => {
  let navigate = useNavigate();

  const [form] = Form.useForm();
  useEffect(() => {
    // 从 localStorage 中读取用户信息并自动填充表单
    const savedUser = JSON.parse(localStorage.getItem("savedUser"));
    if (savedUser) {
      form.setFieldsValue(savedUser);
    }
  }, [form]);

  const onFinish = (values) => {
    console.log("Received values of form: ", values);

    axios
      .post("http://localhost:8102/api/login", values)
      .then((response) => {
        console.log("Registration successful:", response.data);
        alert("Login successful");

        // 更新当前用户状态
        setCurrentUser({
          uid: response.data.uid,
          username: response.data.username,
          role: response.data.role,
          apiKey: response.data.apiKey,
          activated: response.data.activated,
        });

        // 如果用户选择了记住账号密码，则将用户信息存储到 localStorage
        if (values.remember) {
          localStorage.setItem(
            "savedUser",
            JSON.stringify({
              username: values.username,
              password: values.password,
            }),
          );
        } else {
          localStorage.removeItem("savedUser");
        }

        // 转到相应页面
        switch (response.data.role) {
          case "ADMIN":
            navigate("/admin");
            break;
          case "ADVERTISER":
            navigate("/advertiser");
            break;
          case "WEBMASTER":
            navigate("/webmaster");
            break;
          default:
            break;
        }
      })
      .catch((error) => {
        console.error("Registration failed:", error);
        alert("Login failed");
      });
  };

  return (
    <>
      <div
        className="flex justify-center items-center h-screen bg-gray-50"
        // style={{
        //   backgroundImage: "url(/bg.jpg)",
        //   backgroundSize: "cover",
        //   backgroundPosition: "center",
        //   backgroundRepeat: "no-repeat",
        // }}
      >
        <div className="w-1/4 border-2 rounded-lg bg-gray-100">
          <h2 className="m-4 font-bold text-2xl text-center">登录</h2>
          <Form
            form={form}
            name="login"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Flex justify="space-between" align="center">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
              </Flex>
            </Form.Item>

            <Form.Item>
              <Button block type="primary" htmlType="submit">
                Log in
              </Button>
              or{" "}
              <a className="text-blue-400" href="/advertise-platform/register">
                Register now!
              </a>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};
