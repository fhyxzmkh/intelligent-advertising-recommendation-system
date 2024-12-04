import { useEffect } from "react";
import axios from "axios";
import { Card, List } from "antd";

export const ProductList = ({
  products,
  setProducts,
  cookies,
  setCookie,
  removeCookie,
}) => {
  useEffect(() => {
    const getProducts = async () => {
      try {
        const resp = await axios.get("http://localhost:8100/api/product");
        setProducts(resp.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    getProducts();
  }, [setProducts]);

  const updateCookie = (category) => {
    switch (category) {
      case "运动":
        if (!cookies.sport_score) {
          setCookie("sport_score", 10);
        } else {
          const preScore = cookies.sport_score;
          removeCookie("sport_score");
          setCookie("sport_score", Number(preScore) + 10);
        }
        break;
      case "编程":
        if (!cookies.program_score) {
          setCookie("program_score", 10);
        } else {
          const preScore = cookies.program_score;
          removeCookie("program_score");
          setCookie("program_score", Number(preScore) + 10);
        }
        break;
      case "数码":
        if (!cookies.digit_score) {
          setCookie("digit_score", 10);
        } else {
          const preScore = cookies.digit_score;
          removeCookie("digit_score");
          setCookie("digit_score", Number(preScore) + 10);
        }
        break;
      case "考研":
        if (!cookies.edu_score) {
          setCookie("edu_score", 10);
        } else {
          const preScore = cookies.edu_score;
          removeCookie("edu_score");
          setCookie("edu_score", Number(preScore) + 10);
        }
        break;
      default:
        return;
    }
  };

  return (
    <div className="m-4">
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={products}
        renderItem={(product) => (
          <List.Item>
            <Card
              onClick={() => updateCookie(product.category)}
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
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};
