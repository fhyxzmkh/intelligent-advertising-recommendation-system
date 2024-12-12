import { Button, Menu, MenuProps, Result } from "antd";
import { ProfileOutlined, DashboardOutlined } from "@ant-design/icons";
import { useState } from "react";

import { AddAdvertise } from "../modules/AddAdvertise";
import { ChangeAdvertise } from "../modules/ChangeAdvertise";
import { DeleteAdvertise } from "../modules/DeleteAdvertise";
import { TimeIntervalStatistics } from "../modules/TimeIntervalStatistics";

type MenuItem = Required<MenuProps>["items"][number];
const items: MenuItem[] = [
  {
    key: "sub1",
    label: "广告管理",
    icon: <ProfileOutlined />,
    children: [
      { key: "1", label: "新增广告" },
      { key: "2", label: "修改广告信息" },
      { key: "3", label: "删除广告" },
    ],
  },
  {
    type: "divider",
  },
  {
    key: "sub2",
    label: "统计数据",
    icon: <DashboardOutlined />,
    children: [
      { key: "4", label: "时段统计" },
      { key: "5", label: "广告收益" },
    ],
  },
];

export const AdvertiserPage = ({ currentUser }) => {
  if (
    currentUser === null ||
    currentUser.role !== "ADVERTISER" ||
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
          {currentSelect === "1" ? (
            <AddAdvertise currentUser={currentUser} />
          ) : null}
          {currentSelect === "2" ? (
            <ChangeAdvertise currentUser={currentUser} />
          ) : null}
          {currentSelect === "3" ? (
            <DeleteAdvertise currentUser={currentUser} />
          ) : null}
          {currentSelect === "4" ? (
            <TimeIntervalStatistics currentUser={currentUser} />
          ) : null}
          {currentSelect === "5" ? <></> : null}
        </div>
      </div>
    </>
  );
};
