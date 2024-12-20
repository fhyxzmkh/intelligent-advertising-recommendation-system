import { useEffect } from "react";
import axios from "axios";
import { Button, Card, List } from "antd";
import { ShoppingOutlined } from "@ant-design/icons";

export const ProductList = ({
  products,
  setProducts,
  cookies,
  setCookie,
  removeCookie,
  setShoppingCartGoods,
}) => {
  useEffect(() => {
    const getProducts = async () => {
      try {
        const resp = await axios.get("http://101.43.35.186:8100/api/product");
        setProducts(resp.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    getProducts();
  }, [setProducts]);

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

  const addToCart = (product) => {
    setShoppingCartGoods((prevCart) => {
      // 检查购物车中是否已经存在该商品
      const existingProductIndex = prevCart.findIndex(
        (item) => item.name === product.productName,
      );

      if (existingProductIndex !== -1) {
        // 如果存在，更新该商品的 count
        return prevCart.map((item, index) =>
          index === existingProductIndex
            ? { ...item, count: item.count + 1 }
            : item,
        );
      } else {
        // 如果不存在，添加新商品到购物车
        return prevCart.concat({
          name: product.productName,
          img_url: product.imageUrl,
          category: product.category,
          price: Number(product.price),
          count: 1,
        });
      }
    });
  };

  return (
    <div className="m-4">
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={products}
        renderItem={(product) => (
          <List.Item>
            <Card
              onClick={() => updateCookie(product.category, 10)}
              hoverable
              cover={
                <img
                  className="border-2"
                  alt={product.productName}
                  src={product.imageUrl}
                />
              }
            >
              <Card.Meta
                title={product.productName}
                description={product.productDescription}
              />
              <div style={{ marginTop: 16 }}>
                <span>价格: ¥{product.price}</span>
              </div>
              <Button
                type="primary"
                icon={<ShoppingOutlined />}
                className="float-right"
                onClick={() => {
                  updateCookie(product.category, 20);
                  addToCart(product);
                }}
              >
                加入购物车
              </Button>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};
