import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useCallback, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import request from "../../../server/request";
import Cookies from "js-cookie";

Chart.register(CategoryScale);

const AdminDashboard = () => {
  const [usersDatas, setUsersDatas] = useState(null)
  const [educationsDatas, setEducationsDatas] = useState(null)
  const [experiencesDatas, setExperiencesDatas] = useState(null);

  const getUsersTotals = async () => {
    await request("api/v1/users", {
      headers: {
        Authorization: "Bearer " + Cookies.get("token"),
      },
      params: {
        role: "user",
      },
    }).then((res) =>
      setUsersDatas(res.data.pagination.total)
    );
  };

  const getExperiencesTotals = async () => {
    await request("api/v1/experiences", {
      headers: {
        Authorization: "Bearer " + Cookies.get("token"),
      },
    }).then((res) =>
    setExperiencesDatas(res.data.pagination.total)
    );
  };

  const getEducationsTotals = async () => {
    await request("api/v1/education", {
      headers: {
        Authorization: "Bearer " + Cookies.get("token"),
      },
    }).then((res) =>
    setEducationsDatas(res.data.pagination.total)
    );
  };

  useEffect(() => {
    getUsersTotals();
    getExperiencesTotals();
    getEducationsTotals()
  }, []);

  const [chartData, setChartData] = useState({
    labels: ["Users", "Educations", "Experiences"],
    datasets: [
      {
        label: "Statistics",
        data: [
          usersDatas ? usersDatas : 0,
          educationsDatas ? educationsDatas : 0,
          experiencesDatas ? experiencesDatas : 0,
        ],
        backgroundColor: ["red", "green", "blue"],
        borderWidth: 1,
      },
    ],
  });
  return (
    <div>
      Working on it. Please, come back later...
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Users Gained between 2016-2020",
            },
          },
        }}
      />
    </div>
  );
};

export default AdminDashboard;
