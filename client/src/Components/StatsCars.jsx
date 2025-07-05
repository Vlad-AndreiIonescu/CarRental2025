import { Pie, Line } from "react-chartjs-2";

export default function StatsCars() {
  const types = {
    labels: ["SUV", "Sedan", "Hatchback", "Coupe", "Pickup"],
    datasets: [
      {
        data: [10, 6, 3, 2, 1],
        backgroundColor: [
          "#f59e0b",
          "#3b82f6",
          "#10b981",
          "#ef4444",
          "#6366f1",
        ],
      },
    ],
  };

  const added = {
    labels: ["Ian", "Feb", "Mar", "Apr", "Mai", "Iun"],
    datasets: [
      {
        label: "Mașini adăugate",
        data: [1, 2, 3, 1, 4, 2],
        borderColor: "#3b82f6",
        backgroundColor: "#3b82f644",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">🚗 Statistici Mașini</h1>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Distribuție pe tip</h2>
        <Pie data={types} />
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Mașini adăugate în flotă</h2>
        <Line data={added} />
      </div>
    </div>
  );
}
