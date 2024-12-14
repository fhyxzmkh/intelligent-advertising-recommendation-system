import { useEffect, useState } from "react";
import axios from "axios";
import { List, Button } from "antd";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// 注册 Chart.js 的组件
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
);

export const AdvertisingRevenue = ({ currentUser }) => {
  const [ads, setAds] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [profitableAds, setProfitableAds] = useState([]);
  const [chartData, setChartData] = useState({});
  const [viewMode, setViewMode] = useState("list"); // "list", "category", "location"

  useEffect(() => {
    const getAds = async () => {
      const response = await axios.get(
        `http://localhost:8102/api/statistic/my-details?uid=${currentUser.uid}`,
      );
      setAds(response.data);
      console.log(response.data);
    };

    getAds();
  }, [currentUser]);

  useEffect(() => {
    const filteredAds = ads.filter((ad) => ad.clickedCount > 0);
    setProfitableAds(filteredAds);

    setTotalRevenue(
      ads.reduce((sum, ad) => {
        return sum + (Number(ad.unitPrice) / 0.1) * Number(ad.clickedCount);
      }, 0),
    );

    // 初始化图表数据为 "按广告分类"
    updateChartData(filteredAds, "category");
  }, [ads]);

  const updateChartData = (filteredAds, mode) => {
    let labels = [];
    let data = [];
    let labelText = "";

    if (mode === "category") {
      // 按广告分类统计收益
      const categoryRevenue = {};
      filteredAds.forEach((ad) => {
        categoryRevenue[ad.adCategory] =
          (categoryRevenue[ad.adCategory] || 0) +
          (Number(ad.unitPrice) / 0.1) * Number(ad.clickedCount);
      });
      labels = Object.keys(categoryRevenue);
      data = Object.values(categoryRevenue);
      labelText = "按广告分类统计收益";
    } else if (mode === "location") {
      // 按广告位置统计收益
      const locationRevenue = {};
      filteredAds.forEach((ad) => {
        locationRevenue[ad.dropLocation] =
          (locationRevenue[ad.dropLocation] || 0) +
          (Number(ad.unitPrice) / 0.1) * Number(ad.clickedCount);
      });
      labels = Object.keys(locationRevenue);
      data = Object.values(locationRevenue);
      labelText = "按广告位置统计收益";
    }

    setChartData({
      labels,
      datasets: [
        {
          label: labelText,
          data,
          backgroundColor: "rgba(75, 192, 192, 0.5)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    });
  };

  const handleModeChange = (mode) => {
    setViewMode(mode);
    if (mode !== "list") {
      updateChartData(profitableAds, mode);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-full max-w-4xl">
          <div className="flex justify-evenly mb-4">
            <Button
              color="primary"
              variant="outlined"
              onClick={() => handleModeChange("list")}
            >
              列表视图
            </Button>
            <Button
              color="primary"
              variant="outlined"
              onClick={() => handleModeChange("category")}
            >
              按分类统计
            </Button>
            <Button
              color="primary"
              variant="outlined"
              onClick={() => handleModeChange("location")}
            >
              按位置统计
            </Button>
          </div>

          {viewMode === "list" && (
            <div className="flex justify-center">
              <div
                className="w-2/3 bg-gray-50 rounded-md shadow-md"
                style={{
                  maxHeight: "420px", // 固定容器最大高度
                  overflowY: "auto", // 启用垂直滚动条
                }}
              >
                <List
                  header={
                    <div className="font-bold text-2xl text-center py-2">
                      广告总收益为: {totalRevenue.toFixed(2)} 元
                    </div>
                  }
                  bordered
                  dataSource={profitableAds}
                  renderItem={(ad) => (
                    <List.Item className="flex justify-between items-center">
                      <div>
                        <span className="font-bold">广告名称：{ad.adName}</span>
                        <p>类型：{ad.adCategory}</p>
                        <p>位置：{ad.dropLocation}</p>
                        <p>
                          收益：
                          {(
                            (Number(ad.unitPrice) / 0.1) *
                            Number(ad.clickedCount)
                          ).toFixed(2)}{" "}
                          元
                        </p>
                      </div>
                    </List.Item>
                  )}
                />
              </div>
            </div>
          )}

          {viewMode === "category" && (
            <Bar
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: "top" },
                  title: { display: true, text: "广告收益 (按分类统计)" },
                },
              }}
            />
          )}

          {viewMode === "location" && (
            <div style={{ width: "400px", height: "400px", margin: "0 auto" }}>
              <Pie
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false, // 允许自定义宽高
                  plugins: {
                    legend: { position: "top" },
                    title: { display: true, text: "广告收益 (按位置统计)" },
                  },
                }}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
