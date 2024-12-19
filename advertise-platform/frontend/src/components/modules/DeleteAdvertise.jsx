import { useEffect, useState } from "react";
import axios from "axios";
import { Button, List } from "antd";

export const DeleteAdvertise = ({ currentUser }) => {
  const [ads, setAds] = useState([]);

  let url = "";
  if (currentUser.role === "ADMIN")
    url = "http://101.43.35.186:8102/api/advertise/all";
  if (currentUser.role === "ADVERTISER")
    url = `http://101.43.35.186:8102/api/advertise/my-advertise?author=${currentUser.uid}`;

  const getAds = async () => {
    const resp = await axios.get(url);
    console.log(resp.data);
    setAds(resp.data);
  };

  useEffect(() => {
    getAds();
  }, []);

  const handleClick = async (ad) => {
    try {
      await axios.get(
        `http://101.43.35.186:8102/api/advertise/delete?adId=${ad.adId}`,
      );
      await getAds();
      alert("Delete advertise successfully!");
    } catch (error) {
      console.error("Failed to delete advertise:", error);
    }
  };

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
            renderItem={(ad) => (
              <List.Item className="flex justify-between items-center">
                <div>
                  <span className="font-bold">广告名称：{ad.adName}</span>
                  <p>类型：{ad.adCategory}</p>
                  <p>
                    图片：
                    <a
                      className="text-blue-400"
                      target="_blank"
                      href={ad.imgUrl}
                    >
                      链接
                    </a>
                  </p>
                  <p>位置：{ad.dropLocation}</p>
                  <p>单价：{ad.unitPrice}</p>
                  <p>激活：{ad.activated ? "true" : "false"}</p>
                </div>
                <Button
                  color="danger"
                  variant="outlined"
                  className="ml-auto"
                  onClick={() => handleClick(ad)}
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
