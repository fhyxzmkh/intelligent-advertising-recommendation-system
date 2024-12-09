import axios from "axios";
import { Button, Form, Input, Select } from "antd";

const { Option } = Select;

export const AddUser = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);

    axios
      .post("http://localhost:8102/api/register", values)
      .then((response) => {
        console.log("Add user successful:", response.data);
        alert("Add user successful");
      })
      .catch((error) => {
        console.error("Registration failed:", error);
        alert("Register failed");
      });
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="w-1/4 border-2 rounded-lg bg-gray-100">
          <h2 className="m-4 font-bold text-2xl text-center">Add a user</h2>
          <Form
            name="register"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              label="Username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The new password that you entered do not match!",
                      ),
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="role"
              label="Role"
              rules={[
                {
                  required: true,
                  message: "Please select role!",
                },
              ]}
            >
              <Select placeholder="select your role">
                <Option value="ADMIN">管理员</Option>
                <Option value="WEBMASTER">网站主</Option>
                <Option value="ADVERTISER">广告主</Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="float-right">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};
