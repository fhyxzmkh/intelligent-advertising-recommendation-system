import { ShoppingCartOutlined } from "@ant-design/icons";
import { Input } from "antd";
import axios from "axios";

const { Search } = Input;

export const SearchBar = ({
  setProducts,
  cookies,
  setCookie,
  removeCookie,
}) => {
  const handleSearch = async (value) => {
    try {
      const resp = await axios.post("http://localhost:8100/api/product", {
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
        updateCookie(category);
      })
      .catch((error) => {
        console.error("Error calling DeepSeek API:", error);
      });
  };

  const updateCookie = (category) => {
    switch (category) {
      case "运动":
        if (!cookies.sport_score) {
          setCookie("sport_score", 20);
        } else {
          const preScore = cookies.sport_score;
          removeCookie("sport_score");
          setCookie("sport_score", Number(preScore) + 20);
        }
        break;
      case "编程":
        if (!cookies.program_score) {
          setCookie("program_score", 20);
        } else {
          const preScore = cookies.program_score;
          removeCookie("program_score");
          setCookie("program_score", Number(preScore) + 20);
        }
        break;
      case "数码":
        if (!cookies.digit_score) {
          setCookie("digit_score", 20);
        } else {
          const preScore = cookies.digit_score;
          removeCookie("digit_score");
          setCookie("digit_score", Number(preScore) + 20);
        }
        break;
      case "考研":
        if (!cookies.edu_score) {
          setCookie("edu_score", 20);
        } else {
          const preScore = cookies.edu_score;
          removeCookie("edu_score");
          setCookie("edu_score", Number(preScore) + 20);
        }
        break;
      default:
        return;
    }
  };

  return (
    <>
      <div className="search-container m-4 flex justify-evenly">
        <Search
          className="w-2/3"
          placeholder="输入你想搜索的商品"
          onSearch={handleSearch}
        />
        <ShoppingCartOutlined onClick={() => alert("haha")} />
        <span>欢迎您，mkh！</span>
      </div>
    </>
  );
};
