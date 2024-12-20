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
          { type: "news", apiKey: "5c10c5d5-f007-4d84-af2d-a0d5dac5370e" },
          {
            withCredentials: true, // 确保Cookie被发送
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
      // 随机选择三个广告
      const shuffledAds = [...advertises].sort(() => 0.5 - Math.random());
      const selectedAds = shuffledAds.slice(0, 3);
      setRandomAds(selectedAds);
    }
  }, [advertises]);

  useEffect(() => {
    // 在 randomAds 更新后，调用 API 记录广告展示
    if (randomAds.length > 0) {
      randomAds.forEach((ad) => {
        axios.get(
          `http://101.43.35.186:8102/api/statistic/show?adId=${ad.adId}`,
        );
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

  const handleClick = (ad) => {
    alert(`This is ${ad.adCategory}!`);
    updateCookie(ad.adCategory, 30);

    axios.get(`http://101.43.35.186:8102/api/statistic/click?adId=${ad.adId}`);
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
                className="w-[1920px] h-[300px]"
              />
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
};
