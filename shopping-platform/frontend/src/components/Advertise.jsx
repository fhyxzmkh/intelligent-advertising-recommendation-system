import { Carousel } from "antd";
import { useEffect } from "react";
import axios from "axios";

const contentStyle = {
  margin: 0,
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

export const Advertise = () => {
  useEffect(() => {
    const getAdvertise = async () => {
      await axios
        .post(
          "http://localhost:8102/api/advertise",
          { type: "shopping" },
          {
            withCredentials: true, // 确保Cookie被发送
          },
        )
        .then((response) => {
          console.log("Response:", response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };
    getAdvertise();
  }, []);

  return (
    <>
      <div className="ad-container">
        <Carousel arrows infinite={false}>
          <div>
            <h3 style={contentStyle}>1</h3>
          </div>
          <div>
            <h3 style={contentStyle}>2</h3>
          </div>
          <div>
            <h3 style={contentStyle}>3</h3>
          </div>
        </Carousel>
      </div>
    </>
  );
};
