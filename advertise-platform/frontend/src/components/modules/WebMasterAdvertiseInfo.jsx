import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form, Input, InputNumber, List, Modal, Select } from "antd";

const { Option } = Select;

export const WebMasterAdvertiseInfo = ({ currentUser }) => {
  const [ads, setAds] = useState([]);
  const [selectedAd, setSelectedAd] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [form] = Form.useForm();

  const getAds = async () => {
    const resp = await axios.get("http://101.43.35.186:8102/api/advertise/all");
    console.log(resp.data);
    setAds(resp.data);
  };

  useEffect(() => {
    getAds();
  }, []);

  const onFinish = async (values) => {
    console.log(values);

    values["adId"] = selectedAd.adId;

    try {
      await axios.post(
        "http://101.43.35.186:8102/api/advertise/update",
        values,
      );
      alert("修改成功");
      form.resetFields();
      setIsModalOpen(false);
      // 重新获取用户数据并更新列表
      await getAds();
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
              <div className="font-bold text-2xl text-center">广告一览</div>
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
                </div>
              </List.Item>
            )}
          />
        </div>
      </div>
    </>
  );
};
