import { useEffect, useState } from "react";
import axios from "axios";
import { Pie, Line } from "react-chartjs-2";

export default function StatsCars() {
  const [typesData, setTypesData] = useState({});
  const [monthlyData, setMonthlyData] = useState({});

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("https://carrental2025.onrender.com/api/stats/cars", {
          withCredentials: true,
        });

        const types = res.data.types || {};
        const months = res.data.months || {};

        setTypesData({
          labels: Object.keys(types),
          datasets: [
            {
              data: Object.values(types),
              backgroundColor: [
                "#f59e0b",
                "#3b82f6",
                "#10b981",
                "#ef4444",
                "#6366f1",
              ],
            },
          ],
        });

        // Ordine corectă a lunilor
        const allMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const filtered = allMonths.filter((m) => months[m]);

        setMonthlyData({
          labels: filtered,
          datasets: [
            {
              label: "Mașini adăugate",
              data: filtered.map((m) => months[m]),
              borderColor: "#3b82f6",
              backgroundColor: "#3b82f644",
              fill: true,
              tension: 0.3,
            },
          ],
        });
      } catch (err) {
        console.error("Eroare la stats:", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">🚗 Statistici Mașini</h1>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Distribuție pe tip</h2>
        {typesData.labels ? <Pie data={typesData} /> : <p>Se încarcă...</p>}
      </div>
    </div>
  );
}
