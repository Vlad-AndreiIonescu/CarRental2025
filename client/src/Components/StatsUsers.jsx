import { Bar, Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import axios from "axios";

export default function StatsUsers() {
  const [monthlyUsers, setMonthlyUsers] = useState(null);
  const [roles, setRoles] = useState(null);

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const res = await axios.get("https://carrental2025.onrender.com/api/stats/users", {
          withCredentials: true,
        });

        const { labels, monthlyNewUsers, roleDistribution } = res.data;

        setMonthlyUsers({
          labels,
          datasets: [
            {
              label: "Utilizatori noi",
              data: monthlyNewUsers,
              borderColor: "#3b82f6",
              backgroundColor: "#3b82f644",
              tension: 0.4,
              fill: true,
            },
          ],
        });

        setRoles({
          labels: ["Client", "Admin"],
          datasets: [
            {
              label: "Distribuție pe roluri",
              data: [roleDistribution.client, roleDistribution.admin],
              backgroundColor: ["#10b981", "#f59e0b"],
            },
          ],
        });
      } catch (err) {
        console.error("Eroare la obținerea statisticilor utilizatorilor:", err);
      }
    };

    fetchUserStats();
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">👤 Statistici Utilizatori</h1>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Înregistrări lunare</h2>
        {monthlyUsers ? <Line data={monthlyUsers} /> : <p>Se încarcă...</p>}
      </div>
    </div>
  );
}
