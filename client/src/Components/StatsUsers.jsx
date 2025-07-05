import { Line, Bar } from "react-chartjs-2";

export default function StatsUsers() {
  const newUsers = {
    labels: ["Ian", "Feb", "Mar", "Apr", "Mai", "Iun"],
    datasets: [
      {
        label: "Utilizatori noi",
        data: [5, 8, 12, 10, 15, 20],
        borderColor: "#3b82f6",
        backgroundColor: "#3b82f633",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const roles = {
    labels: ["Client", "Admin", "Support"],
    datasets: [
      {
        label: "Utilizatori după rol",
        data: [58, 3, 2],
        backgroundColor: ["#10b981", "#f59e0b", "#6366f1"],
      },
    ],
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">👤 Statistici Utilizatori</h1>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Înregistrări lunare</h2>
        <Line data={newUsers} />
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Distribuție pe roluri</h2>
        <Bar data={roles} />
      </div>
    </div>
  );
}
