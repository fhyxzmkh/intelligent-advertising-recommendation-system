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

  const handleClick = async (value) => {
    if (value !== "全部") {
      updateCookie(value, 15);
    }

    try {
      const resp = await axios.get(
        `http://101.43.35.186:8101/api/newsList?word=${value}`,
      );
      setNewsList(resp.data.newslist);
      //console.log(resp.data.articles.slice(0, 5));
    } catch (error) {
      console.error("Error searching news:", error);
    }
  };

  const handleContent = async (value) => {
    const data = JSON.stringify({
      messages: [
        {
          content: `新闻内容为：${value}，此内容属于运动、数码、考研、编程四大类中的哪一类？直接给出类别，不要冗余文字。`,
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
                  onClick={() => {
                    handleContent(item.content);
                    window.open(item.url, "_blank");
                  }}
                >
                  <List.Item.Meta
                    title={item.title}
                    description={
                      item.description === "" ? "暂无描述..." : item.description
                    }
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
