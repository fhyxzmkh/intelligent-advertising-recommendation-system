import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form, Input, InputNumber, List, Modal, Select } from "antd";

const { Option } = Select;

export const ChangeAdvertise = ({ currentUser }) => {
  const [ads, setAds] = useState([]);
  const [selectedAd, setSelectedAd] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [form] = Form.useForm();

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
                  color="primary"
                  variant="outlined"
                  className="ml-auto"
                  onClick={() => {
                    setSelectedAd(ad);
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
        title="修改广告信息"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}
      >
        <div className="p-4 w-full h-full">
          <Form
            name="EditAdvertiseInfo"
            onFinish={onFinish}
            form={form}
            clearOnDestroy={true}
          >
            <Form.Item
              name="adName"
              label="广告名称"
              rules={[
                {
                  required: true,
                  message: "Please input advertise name!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="adCategory"
              label="广告类型"
              rules={[
                {
                  required: true,
                  message: "Please select category!",
                },
              ]}
            >
              <Select placeholder="select advertise's category">
                <Option value="数码">数码</Option>
                <Option value="考研">考研</Option>
                <Option value="运动">运动</Option>
                <Option value="编程">编程</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="imgUrl"
              label="图片链接"
              rules={[
                {
                  required: true,
                  message: "Please input image's url!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="dropLocation"
              label="广告位置"
              rules={[
                {
                  required: true,
                  message: "Please select location!",
                },
              ]}
            >
              <Select placeholder="select advertise's location">
                <Option value="CAROUSEL">走马灯</Option>
                <Option value="FLOATING">浮动</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="unitPrice"
              label="广告单价"
              rules={[
                {
                  required: true,
                  message: "Please input the unit price!",
                },
                {
                  type: "number",
                  message: "Please input a valid number!",
                },
              ]}
            >
              <InputNumber />
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
