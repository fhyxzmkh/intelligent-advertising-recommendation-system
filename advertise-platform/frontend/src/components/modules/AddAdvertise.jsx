import { Button, Form, Input, InputNumber, Select } from "antd";
import axios from "axios";

const { Option } = Select;

export const AddAdvertise = ({ currentUser }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    values["author"] = currentUser.uid;

    axios
      .post("http://localhost:8102/api/advertise/add", values)
      .then((response) => {
        console.log("Add advertise successful:", response.data);
        alert("Add advertise successful");
      })
      .catch((error) => {
        console.error("Add advertise failed:", error);
        alert("Add advertise failed");
      });

    form.resetFields();
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="w-1/3 border-2 rounded-lg bg-gray-100">
          <h2 className="m-4 font-bold text-2xl text-center">
            Add a advertise
          </h2>
          <Form name="Advertise" onFinish={onFinish} form={form}>
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
      </div>
    </>
  );
};
