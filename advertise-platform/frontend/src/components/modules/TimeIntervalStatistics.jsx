import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Button } from "antd";

// 注册 Chart.js 的组件
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export const TimeIntervalStatistics = ({ currentUser }) => {
  const [rawData, setRawData] = useState([]);
  const [chartData, setChartData] = useState({});
  const [viewMode, setViewMode] = useState("hour"); // "hour", "day", "month", "year"
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get(
          `http://101.43.35.186:8102/api/statistic/my-statistics?author=${currentUser.uid}`,
        );

        setRawData(resp.data);
        setLoading(false);
        updateChart(resp.data, "hour"); // 默认展示小时维度
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const updateChart = (data, mode) => {
    let labels = [];
    let dataset = [];

    if (mode === "hour") {
      // 按小时统计
      const hourlyStats = Array(24).fill(0);
      data.forEach((item) => {
        const hour = new Date(item.operationDate).getHours();
        hourlyStats[hour]++;
      });
      labels = Array.from({ length: 24 }, (_, i) => `${i}:00`);
      dataset = hourlyStats;
    } else if (mode === "day") {
      // 按天统计
      const dailyStats = {};
      data.forEach((item) => {
        const day = new Date(item.operationDate).toISOString().split("T")[0];
        dailyStats[day] = (dailyStats[day] || 0) + 1;
      });
      labels = Object.keys(dailyStats).sort();
      dataset = Object.values(dailyStats);
    } else if (mode === "month") {
      // 按月统计
      const monthlyStats = {};
      data.forEach((item) => {
        const month = new Date(item.operationDate).toISOString().slice(0, 7); // "YYYY-MM"
        monthlyStats[month] = (monthlyStats[month] || 0) + 1;
      });
      labels = Object.keys(monthlyStats).sort();
      dataset = Object.values(monthlyStats);
    } else if (mode === "year") {
      // 按年统计
      const yearlyStats = {};
      data.forEach((item) => {
        const year = new Date(item.operationDate).getFullYear();
        yearlyStats[year] = (yearlyStats[year] || 0) + 1;
      });
      labels = Object.keys(yearlyStats).sort();
      dataset = Object.values(yearlyStats);
    }

    setChartData({
      labels,
      datasets: [
        {
          label: `操作次数 (${mode === "hour" ? "按小时" : mode === "day" ? "按天" : mode === "month" ? "按月" : "按年"})`,
          data: dataset,
          backgroundColor: "rgba(75, 192, 192, 0.5)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    });
  };

  const handleModeChange = (mode) => {
    setViewMode(mode);
    updateChart(rawData, mode);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <Bar
        className="mt-10"
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { position: "top" },
            title: {
              display: true,
              text: `操作次数统计 (${viewMode === "hour" ? "按小时" : viewMode === "day" ? "按天" : viewMode === "month" ? "按月" : "按年"})`,
            },
          },
        }}
      />
      <div className="mt-10">
        <div className="flex justify-evenly">
          <Button
            color="primary"
            variant="outlined"
            onClick={() => handleModeChange("hour")}
          >
            按小时
          </Button>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => handleModeChange("day")}
          >
            按天
          </Button>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => handleModeChange("month")}
          >
            按月
          </Button>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => handleModeChange("year")}
          >
            按年
          </Button>
        </div>
      </div>
    </div>
  );
};
