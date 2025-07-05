import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

export default function Statistics() {
  // Dummy data pentru demo
  const months = ["Ian", "Feb", "Mar", "Apr", "Mai", "Iun"];

  const usersLine = {
    labels: months,
    datasets: [
      {
        label: "Utilizatori noi",
        data: [5, 8, 12, 10, 15, 20],
        borderColor: "#3b82f6",
        backgroundColor: "#3b82f666",
        fill: true,
      },
    ],
  };

  const ordersBar = {
    labels: months,
    datasets: [
      {
        label: "Comenzi",
        data: [4, 6, 5, 9, 11, 14],
        backgroundColor: "#10b981",
      },
      {
        label: "Venituri (€)",
        data: [400, 800, 600, 1000, 1300, 1700],
        backgroundColor: "#f59e0b",
      },
    ],
  };

  const carsPie = {
    labels: ["SUV", "Sedan", "Hatchback", "Pickup", "Coupe"],
    datasets: [
      {
        data: [10, 5, 3, 2, 1],
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

  return (
    <div className="space-y-12">
      <h1 className="text-3xl font-bold">📊 Statistici generale</h1>

      {/* Utilizatori */}
      <section>
        <h2 className="text-xl font-semibold mb-2">👤 Utilizatori</h2>
        <div className="bg-white p-4 rounded shadow">
          <Line data={usersLine} />
        </div>
      </section>

      {/* Comenzi */}
      <section>
        <h2 className="text-xl font-semibold mb-2">📦 Comenzi</h2>
        <div className="bg-white p-4 rounded shadow">
          <Bar data={ordersBar} />
        </div>
      </section>

      {/* Mașini */}
      <section>
        <h2 className="text-xl font-semibold mb-4">🚗 Mașini</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-medium mb-2">Distribuție caroserii</h3>
            <Pie data={carsPie} />
          </div>

          <div className="bg-white p-4 rounded shadow flex flex-col gap-4 justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-500">36</div>
              <div className="text-gray-600">Mașini în total</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">29</div>
              <div className="text-gray-600">Disponibile</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-500">7</div>
              <div className="text-gray-600">Rezervate</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
