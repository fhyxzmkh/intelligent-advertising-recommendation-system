import React, { useState } from "react";
import { Button, message, Modal, Spin } from "antd";
import axios from "axios";

export const ApiFunction = ({ currentUser }) => {
  const [apiKey, setApiKey] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchApiKey = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://101.43.35.186:8102/api/apikey/get-api`,
        {
          params: { uid: currentUser.uid },
        },
      );

      if (response.data) {
        setApiKey(response.data);
        message.success("API Key retrieved successfully!");
      } else {
        message.info("No API Key found.");
      }
    } catch (error) {
      message.error("Failed to fetch API Key.");
    } finally {
      setLoading(false);
    }
  };

  const addApiKey = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://101.43.35.186:8102/api/apikey/add-api`,
        {
          params: { uid: currentUser.uid },
        },
      );

      if (response.data === "Already has an API key") {
        message.warning("User already has an API Key.");
      } else {
        message.success("API Key created successfully!");
        fetchApiKey();
      }
    } catch (error) {
      message.error("Failed to create API Key.");
    } finally {
      setLoading(false);
    }
  };

  const deleteApiKey = async () => {
    try {
      setLoading(true);
      await axios.get(`http://101.43.35.186:8102/api/apikey/delete-api`, {
        params: { uid: currentUser.uid },
      });

      message.success("API Key deleted successfully!");
      setApiKey(null);
    } catch (error) {
      message.error("Failed to delete API Key.");
    } finally {
      setLoading(false);
    }
  };

  const showApiKey = () => {
    Modal.info({
      title: "Your API Key",
      content: (
        <p className="break-words">{apiKey || "No API Key available."}</p>
      ),
    });
  };

  function showAdvertiseCode() {
    const advertiseCode = `
import { Carousel } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";

export const Advertise = ({ cookies, setCookie, removeCookie }) => {
  const [advertises, setAdvertises] = useState([]);
  const [randomAds, setRandomAds] = useState([]);

  useEffect(() => {
    const getAdvertise = async () => {
      await axios
        .post(
          "http://101.43.35.186:8102/api/advertise/get-particular-advertise",
          {
            type: "shopping",
            apiKey: "替换为您的 API Key",
            user_id: \`\${cookies.user_id}\`,
            sport_score: \`\${cookies.sport_score !== undefined ? cookies.sport_score : 0}\`,
            digit_score: \`\${cookies.digit_score !== undefined ? cookies.digit_score : 0}\`,
            program_score: \`\${cookies.program_score !== undefined ? cookies.program_score : 0}\`,
            edu_score: \`\${cookies.edu_score !== undefined ? cookies.edu_score : 0}\`,
          },
        )
        .then((response) => {
          console.log("Response:", response.data);
          setAdvertises(response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };
    getAdvertise();
  }, []);

  useEffect(() => {
    if (advertises.length > 0) {
      const shuffledAds = [...advertises].sort(() => 0.5 - Math.random());
      const selectedAds = shuffledAds.slice(0, 3);
      setRandomAds(selectedAds);
    }
  }, [advertises]);

  useEffect(() => {
    if (randomAds.length > 0) {
      randomAds.forEach((ad) => {
        axios.get(\`http://101.43.35.186:8102/api/statistic/show?adId=\${ad.adId}\`);
      });
    }
  }, [randomAds]);

  const updateCookie = (category, weight) => {
    switch (category) {
      case "运动":
        if (!cookies.sport_score) {
          setCookie("sport_score", weight, { path: "/" });
        } else {
          const preScore = cookies.sport_score;
          removeCookie("sport_score");
          setCookie("sport_score", Number(preScore) + weight, { path: "/" });
        }
        break;
      case "编程":
        if (!cookies.program_score) {
          setCookie("program_score", weight, { path: "/" });
        } else {
          const preScore = cookies.program_score;
          removeCookie("program_score");
          setCookie("program_score", Number(preScore) + weight, { path: "/" });
        }
        break;
      case "数码":
        if (!cookies.digit_score) {
          setCookie("digit_score", weight, { path: "/" });
        } else {
          const preScore = cookies.digit_score;
          removeCookie("digit_score");
          setCookie("digit_score", Number(preScore) + weight, { path: "/" });
        }
        break;
      case "考研":
        if (!cookies.edu_score) {
          setCookie("edu_score", weight, { path: "/" });
        } else {
          const preScore = cookies.edu_score;
          removeCookie("edu_score");
          setCookie("edu_score", Number(preScore) + weight, { path: "/" });
        }
        break;
      default:
        return;
    }
  };

  const handleClick = (ad) => {
    alert(\`This is \${ad.adCategory}!\`);
    updateCookie(ad.adCategory, 30);
    axios.get(\`http://101.43.35.186:8102/api/statistic/click?adId=\${ad.adId}\`);
  };

  return (
    <>
      <div className="ad-container">
        <Carousel autoplay adaptiveHeight infinite={false} arrows={true}>
          {randomAds.map((ad) => (
            <div
              className="cursor-pointer"
              key={ad.adId}
              onClick={() => handleClick(ad)}
            >
              <img
                src={ad.imgUrl}
                alt={ad.adName}
                className="w-[1920px] h-[360px]"
              />
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
};
`;

    Modal.info({
      title: "Advertise 组件代码",
      width: 800,
      content: (
        <div
          style={{
            maxHeight: "400px",
            overflowY: "auto", // 支持垂直滚动
          }}
        >
          <p>以下是 `Advertise` 组件的完整代码：</p>
          <pre className="break-words bg-gray-100 p-4 rounded-md">
            <code>{advertiseCode}</code>
          </pre>
        </div>
      ),
    });
  }

  return (
    <>
      <div className="p-6 bg-gray-100 rounded-lg shadow-md flex flex-col justify-center items-center h-screen">
        <h2 className="text-2xl font-bold mb-4">API Key Management</h2>
        <div>
          {loading ? (
            <Spin size="large" />
          ) : (
            <>
              <div className="flex flex-col gap-4">
                <Button type="primary" onClick={fetchApiKey} className="w-48">
                  查看 API Key
                </Button>
                <Button type="dashed" onClick={addApiKey} className="w-48">
                  获取 API Key
                </Button>
                <Button danger onClick={deleteApiKey} className="w-48">
                  删除 API Key
                </Button>
              </div>
              {apiKey && (
                <div className="mt-4">
                  <Button type="link" onClick={showApiKey}>
                    View API Key
                  </Button>
                </div>
              )}
              {apiKey && (
                <div className="mt-4">
                  <Button type="link" onClick={showAdvertiseCode}>
                    查看API操作示例
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
