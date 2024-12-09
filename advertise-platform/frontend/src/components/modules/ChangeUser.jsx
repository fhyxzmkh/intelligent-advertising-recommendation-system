import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form, Input, List, Modal, Select } from "antd";

const { Option } = Select;

export const ChangeUser = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [form] = Form.useForm();

  const getUsers = async () => {
    const resp = await axios.get("http://localhost:8102/api/user/all");
    console.log(resp.data);
    setUsers(resp.data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const onFinish = async (values) => {
    const dataJSON = {
      uid: selectedUser.uid,
      apiKey: values.apiKey,
      activated: values.activated === "true",
    };

    try {
      await axios.post("http://localhost:8102/api/user/update", dataJSON);
      alert("修改成功");
      form.resetFields();
      setIsModalOpen(false);
      // 重新获取用户数据并更新列表
      await getUsers();
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  return (
    <>
      <div className="flex justify-center h-screen overflow-y-scroll">
        <div className="w-1/2">
          <List
            className="bg-gray-50"
            header={
              <div className="font-bold text-2xl text-center">用户信息</div>
            }
            bordered
            dataSource={users}
            renderItem={(user) => (
              <List.Item className="flex justify-between items-center">
                <div>
                  <span className="font-bold">用户名：{user.username}</span>
                  <p>apiKey：{user.apiKey === null ? "无" : user.apiKey}</p>
                  <p>是否激活：{user.activated ? "是" : "否"}</p>
                </div>
                <Button
                  color="primary"
                  variant="outlined"
                  className="ml-auto"
                  onClick={() => {
                    setSelectedUser(user);
                    setIsModalOpen(true);
                  }}
                >
                  Edit
                </Button>
              </List.Item>
            )}
          />
        </div>
      </div>

      <Modal
        title="修改用户信息"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}
      >
        <div className="p-4 w-full h-full">
          <Form
            name="EditUserInfo"
            onFinish={onFinish}
            form={form}
            clearOnDestroy={true}
          >
            <Form.Item
              name="apiKey"
              label="ApiKey"
              tooltip="This is a unique key for user"
              rules={[
                {
                  required: true,
                  message: "Please input api key!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="activated"
              label="是否激活"
              rules={[
                {
                  required: true,
                  message: "Please select status!",
                },
              ]}
            >
              <Select placeholder="select user's status">
                <Option value="true">是</Option>
                <Option value="false">否</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="float-right">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};
