import { Bar, Line } from "react-chartjs-2";

export default function StatsOrders() {
  const revenue = {
    labels: ["Ian", "Feb", "Mar", "Apr", "Mai", "Iun"],
    datasets: [
      {
        label: "Venituri (€)",
        data: [400, 800, 600, 1000, 1300, 1700],
        backgroundColor: "#f59e0b",
      },
    ],
  };

  const statusLine = {
    labels: ["Ian", "Feb", "Mar", "Apr", "Mai", "Iun"],
    datasets: [
      {
        label: "Confirmate",
        data: [3, 5, 4, 6, 7, 10],
        borderColor: "#10b981",
        fill: false,
      },
      {
        label: "Anulate",
        data: [1, 1, 1, 2, 1, 1],
        borderColor: "#ef4444",
        fill: false,
      },
    ],
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">📦 Statistici Comenzi</h1>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Venituri lunare</h2>
        <Bar data={revenue} />
      </div>
    </div>
  );
}
