import { ShoppingCartOutlined } from "@ant-design/icons";
import { Avatar, Button, Input, List, Modal } from "antd";
import axios from "axios";
import { useState } from "react";

const { Search } = Input;

export const SearchBar = ({
  setProducts,
  cookies,
  setCookie,
  removeCookie,
  shoppingCartGoods,
  setShoppingCartGoods,
}) => {
  const handleSearch = async (value) => {
    if (value === null || value === "") {
      alert("请输入搜索内容");
      return;
    }

    try {
      const resp = await axios.post("http://101.43.35.186:8100/api/product", {
        keyword: value,
      });
      setProducts(resp.data);
    } catch (error) {
      console.error("Error searching products:", error);
    }

    const data = JSON.stringify({
      messages: [
        {
          content: `搜索内容为：${value}，此内容属于运动、数码、考研、编程四大类中的哪一类？直接给出类别，不要冗余文字。`,
          role: "system",
        },
      ],
      model: "deepseek-chat",
      frequency_penalty: 0,
      max_tokens: 2048,
      presence_penalty: 0,
      response_format: {
        type: "text",
      },
      stop: null,
      stream: false,
      stream_options: null,
      temperature: 1,
      top_p: 1,
      tools: null,
      tool_choice: "none",
      logprobs: false,
      top_logprobs: null,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.deepseek.com/chat/completions",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer sk-6f1569d8dc1e46fc9d29750c08702199",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        const category = response.data.choices[0].message.content;
        console.log("Category:", category);
        updateCookie(category, 20);
      })
      .catch((error) => {
        console.error("Error calling DeepSeek API:", error);
      });
  };

  const updateCookie = (category, weight) => {
    switch (category) {
      case "运动":
        if (!cookies.sport_score) {
          setCookie("sport_score", weight, { path: "/" });
        } else {
          const preScore = cookies.sport_score;
          removeCookie("sport_score");
          setCookie("sport_score", Number(preScore) + weight, {
            path: "/",
          });
        }
        break;
      case "编程":
        if (!cookies.program_score) {
          setCookie("program_score", weight, { path: "/" });
        } else {
          const preScore = cookies.program_score;
          removeCookie("program_score");
          setCookie("program_score", Number(preScore) + weight, {
            path: "/",
          });
        }
        break;
      case "数码":
        if (!cookies.digit_score) {
          setCookie("digit_score", weight, { path: "/" });
        } else {
          const preScore = cookies.digit_score;
          removeCookie("digit_score");
          setCookie("digit_score", Number(preScore) + weight, {
            path: "/",
          });
        }
        break;
      case "考研":
        if (!cookies.edu_score) {
          setCookie("edu_score", weight, { path: "/" });
        } else {
          const preScore = cookies.edu_score;
          removeCookie("edu_score");
          setCookie("edu_score", Number(preScore) + weight, {
            path: "/",
          });
        }
        break;
      default:
        return;
    }
  };

  const calculateTotalPrice = () => {
    return shoppingCartGoods.reduce(
      (total, item) => total + item.price * item.count,
      0,
    );
  };

  const handleClearCart = () => {
    setShoppingCartGoods([]);
    setIsModalOpen(false);
  };

  const handleClick = () => {
    console.log(shoppingCartGoods);
    setIsModalOpen(true);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    const totalPrice = calculateTotalPrice();
    setIsModalOpen(false);
    setShoppingCartGoods([]);
    alert(
      `目前暂未开通支付模块，请敬请期待！\n总价格: ￥${totalPrice.toFixed(2)}`,
    );
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="search-container m-4 flex justify-evenly">
        <Search
          className="w-2/3"
          placeholder="输入你想搜索的商品"
          onSearch={handleSearch}
        />
        <ShoppingCartOutlined onClick={handleClick} />
        <span>欢迎您！</span>
      </div>

      <Modal
        title="我的购物车"
        open={isModalOpen}
        okText="下单"
        cancelText="清空"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="clear" onClick={handleClearCart}>
            清空
          </Button>,
          <Button key="order" type="primary" onClick={handleOk}>
            下单
          </Button>,
        ]}
      >
        <List
          itemLayout="horizontal"
          dataSource={shoppingCartGoods}
          renderItem={(obj) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    shape="square"
                    size={{
                      xs: 24,
                      sm: 32,
                      md: 40,
                      lg: 64,
                      xl: 80,
                      xxl: 100,
                    }}
                    src={obj.img_url}
                  />
                }
                title={obj.name}
                description={`￥ ${obj.price} × ${obj.count}`}
              />
            </List.Item>
          )}
        />
      </Modal>
    </>
  );
};
