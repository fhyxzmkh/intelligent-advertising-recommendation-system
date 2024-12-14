import { Button, Menu, MenuProps, Result } from "antd";
import { DashboardOutlined, ProfileOutlined } from "@ant-design/icons";
import { useState } from "react";

import { WebMasterAdvertiseInfo } from "../modules/WebMasterAdvertiseInfo";
import { ApiFunction } from "../modules/ApiFunction";
import { WebMasterTimeIntervalStatistics } from "../modules/WebMasterTimeIntervalStatistics";
import { WebMasterAdvertisingEffect } from "../modules/WebMasterAdvertisingEffect";
import { WebMasterRevenue } from "../modules/WebMasterRevenue";

type MenuItem = Required<MenuProps>["items"][number];
const items: MenuItem[] = [
  {
    key: "sub1",
    label: "广告事务",
    icon: <ProfileOutlined />,
    children: [
      { key: "1", label: "广告一览" },
      { key: "2", label: "API管理" },
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
      { key: "3", label: "时段统计" },
      { key: "4", label: "广告效果" },
      { key: "5", label: "广告收益" },
    ],
  },
];

export const WebMasterPage = ({ currentUser }) => {
  if (
    currentUser === null ||
    currentUser.role !== "WEBMASTER" ||
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
            <WebMasterAdvertiseInfo currentUser={currentUser} />
          ) : null}
          {currentSelect === "2" ? (
            <ApiFunction currentUser={currentUser} />
          ) : null}
          {currentSelect === "3" ? (
            <WebMasterTimeIntervalStatistics currentUser={currentUser} />
          ) : null}
          {currentSelect === "4" ? (
            <WebMasterAdvertisingEffect currentUser={currentUser} />
          ) : null}
          {currentSelect === "5" ? (
            <WebMasterRevenue currentUser={currentUser} />
          ) : null}
        </div>
      </div>
    </>
  );
};
