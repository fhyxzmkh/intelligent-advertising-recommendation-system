import { Button, List } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";

export const DeleteUser = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const resp = await axios.get("http://101.43.35.186:8102/api/user/all");
    console.log(resp.data);
    setUsers(resp.data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleClick = async (user) => {
    try {
      await axios.get(
        `http://101.43.35.186:8102/api/user/delete?uid=${user.uid}`,
      );
      await getUsers();
      alert("Delete user successfully!");
    } catch (error) {
      console.error("Failed to delete user:", error);
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
                  color="danger"
                  variant="outlined"
                  className="ml-auto"
                  onClick={() => handleClick(user)}
                >
                  Delete
                </Button>
              </List.Item>
            )}
          />
        </div>
      </div>
    </>
  );
};
