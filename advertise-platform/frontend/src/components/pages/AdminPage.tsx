import { Button, Result, Menu, MenuProps } from "antd";
import { ProfileOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";

import { AddUser } from "../modules/AddUser";
import { ChangeUser } from "../modules/ChangeUser";
import { DeleteUser } from "../modules/DeleteUser";
import { ChangeAdvertise } from "../modules/ChangeAdvertise";
import { DeleteAdvertise } from "../modules/DeleteAdvertise";

type MenuItem = Required<MenuProps>["items"][number];
const items: MenuItem[] = [
  {
    key: "sub1",
    label: "用户管理",
    icon: <UserOutlined />,
    children: [
      { key: "1", label: "新增用户" },
      { key: "2", label: "修改用户信息" },
      { key: "3", label: "注销用户" },
    ],
  },
  {
    type: "divider",
  },
  {
    key: "sub2",
    label: "广告管理",
    icon: <ProfileOutlined />,
    children: [
      { key: "4", label: "修改广告信息" },
      { key: "5", label: "删除广告" },
    ],
  },
];

export const AdminPage = ({ currentUser }) => {
  if (
    currentUser === null ||
    currentUser.role !== "ADMIN" ||
    currentUser.activated === false
  ) {
    return (
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <Button type="primary" href="/advertise-platform/login">
            Back to login
          </Button>
        }
      />
    );
  }

  const [currentSelect, setCurrentSelect] = useState("1");

  const onClick = (e) => {
    console.log("click ", e);

    setCurrentSelect(e.key);
  };

  return (
    <>
      <div className="flex">
        <div className="w-1/4 h-screen flex items-center">
          <Menu
            onClick={onClick}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1", "sub2"]}
            mode="inline"
            items={items}
          />
        </div>
        <div className="w-full h-screen bg-red-50">
          {currentSelect === "1" ? <AddUser /> : null}
          {currentSelect === "2" ? <ChangeUser /> : null}
          {currentSelect === "3" ? <DeleteUser /> : null}
          {currentSelect === "4" ? (
            <ChangeAdvertise currentUser={currentUser} />
          ) : null}
          {currentSelect === "5" ? (
            <DeleteAdvertise currentUser={currentUser} />
          ) : null}
        </div>
      </div>
    </>
  );
};
