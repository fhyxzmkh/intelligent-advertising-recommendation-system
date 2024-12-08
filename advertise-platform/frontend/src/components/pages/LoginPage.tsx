import { Button, Checkbox, Flex, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router";

export const LoginPage = ({ setCurrentUser }) => {
  let navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);

    axios
      .post("http://localhost:8102/api/login", values)
      .then((response) => {
        console.log("Registration successful:", response.data);
        alert("Login successful");
        setCurrentUser({
          username: response.data.username,
          role: response.data.role,
          activated: response.data.activated,
        });

        navigate("/admin");
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
