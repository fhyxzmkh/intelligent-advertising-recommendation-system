import { useEffect, useState } from "react";
import axios from "axios";
import { List } from "antd";

export const WebMasterAdvertisingEffect = ({ currentUser }) => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const getAds = async () => {
      const response = await axios.get(
        `http://localhost:8102/api/statistic/all-details`,
      );
      setAds(response.data);
      console.log(response.data);
    };

    getAds();
  }, []);

  return (
    <>
      <div className="flex justify-center h-screen overflow-y-scroll">
        <div className="w-1/2">
          <List
            className="bg-gray-50"
            header={
              <div className="font-bold text-2xl text-center">广告信息</div>
            }
            bordered
            dataSource={ads}
            renderItem={(ad) =>
              ad.showedCount !== 0 && (
                <List.Item className="flex justify-between items-center">
                  <div>
                    <span className="font-bold">广告名称：{ad.adName}</span>
                    <p>类型：{ad.adCategory}</p>
                    <p>位置：{ad.dropLocation}</p>
                    <p>单价：{ad.unitPrice}</p>
                    <p>点击次数：{ad.clickedCount}</p>
                    <p>展示次数：{ad.showedCount}</p>
                    <p>
                      点击率：
                      {ad.showedCount !== 0
                        ? (ad.clickedCount / ad.showedCount) * 100
                        : 0}
                      %
                    </p>
                  </div>
                </List.Item>
              )
            }
          />
        </div>
      </div>
    </>
  );
};
