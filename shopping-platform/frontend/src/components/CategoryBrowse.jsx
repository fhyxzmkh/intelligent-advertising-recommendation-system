import { Tag } from "antd";
import axios from "axios";

export const CategoryBrowse = ({
  setProducts,
  cookies,
  setCookie,
  removeCookie,
}) => {
  const handleClick = (category) => {
    let getProducts;

    if (category === "全部") {
      getProducts = async () => {
        try {
          const resp = await axios.get(`http://localhost:8100/api/product`);
          setProducts(resp.data);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
    } else {
      updateCookie(category, 15);

      getProducts = async () => {
        try {
          const resp = await axios.get(
            `http://localhost:8100/api/product/category?category=${category}`,
          );
          setProducts(resp.data);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
    }

    getProducts();
  };

  const updateCookie = (category, weight) => {
    switch (category) {
      case "运动":
        if (!cookies.sport_score) {
          setCookie("sport_score", weight);
        } else {
          const preScore = cookies.sport_score;
          removeCookie("sport_score");
          setCookie("sport_score", Number(preScore) + weight);
        }
        break;
      case "编程":
        if (!cookies.program_score) {
          setCookie("program_score", weight);
        } else {
          const preScore = cookies.program_score;
          removeCookie("program_score");
          setCookie("program_score", Number(preScore) + weight);
        }
        break;
      case "数码":
        if (!cookies.digit_score) {
          setCookie("digit_score", weight);
        } else {
          const preScore = cookies.digit_score;
          removeCookie("digit_score");
          setCookie("digit_score", Number(preScore) + weight);
        }
        break;
      case "考研":
        if (!cookies.edu_score) {
          setCookie("edu_score", weight);
        } else {
          const preScore = cookies.edu_score;
          removeCookie("edu_score");
          setCookie("edu_score", Number(preScore) + weight);
        }
        break;
      default:
        return;
    }
  };

  return (
    <>
      <div className="search-container m-4 flex justify-evenly">
        <Tag
          className="w-1/5 text-center font-bold cursor-pointer"
          color="red"
          onClick={() => handleClick("全部")}
        >
          全部
        </Tag>
        <Tag
          className="w-1/5 text-center font-bold cursor-pointer"
          color="red"
          onClick={() => handleClick("运动")}
        >
          运动
        </Tag>
        <Tag
          className="w-1/5 text-center font-bold cursor-pointer"
          color="volcano"
          onClick={() => handleClick("数码")}
        >
          数码
        </Tag>
        <Tag
          className="w-1/5 text-center font-bold cursor-pointer"
          color="orange"
          onClick={() => handleClick("考研")}
        >
          考研
        </Tag>
        <Tag
          className="w-1/5 text-center font-bold cursor-pointer"
          color="gold"
          onClick={() => handleClick("编程")}
        >
          编程
        </Tag>
      </div>
    </>
  );
};
