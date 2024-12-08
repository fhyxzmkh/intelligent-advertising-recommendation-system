import { List, Tag } from "antd";
import axios from "axios";

const position = "bottom";
const align = "center";

export const NewsList = ({
  cookies,
  setCookie,
  removeCookie,
  newsList,
  setNewsList,
}) => {
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

  const handleClick = async (value) => {
    let url =
      "https://newsapi.org/v2/everything?" +
      `q=${value}&` +
      "sortBy=popularity&" +
      "apiKey=93c9087a0cb141bd8ad71e67361892cf";

    if (value === "全部") {
      url =
        "https://newsapi.org/v2/top-headlines?country=us&apiKey=93c9087a0cb141bd8ad71e67361892cf";
    }

    if (value !== "全部") {
      updateCookie(value, 15);
    }

    try {
      const resp = await axios.get(url);
      setNewsList(resp.data.articles);
      console.log(resp.data.articles.slice(0, 5));
    } catch (error) {
      console.error("Error searching news:", error);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="w-2/3">
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
          <div className="m-4">
            <List
              pagination={{
                position,
                align,
              }}
              dataSource={newsList}
              renderItem={(item) => (
                <List.Item
                  className="cursor-pointer"
                  onClick={() => window.open(item.url, "_blank")}
                >
                  <List.Item.Meta
                    title={item.title}
                    description={item.description}
                  />
                </List.Item>
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
};
