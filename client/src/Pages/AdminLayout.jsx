import { useState, useEffect } from "react";
import Dashboard from "../Components/Dashboard";
import Cars from "../Components/Cars";
import Orders from "../Components/Orders";
import Users from "../Components/Users";
import Statistics from "../Components/Statistics";
import StatsUsers from "../Components/StatsUsers";
import StatsOrders from "../Components/StatsOrders";
import StatsCars from "../Components/StatsCars";
import axios from "axios";

export default function AdminLayout() {
  const [section, setSection] = useState("dashboard");
  const [openStats, setOpenStats] = useState(false);
  const [statsData, setStatsData] = useState({
    users: [],
    orders: [],
    cars: []
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, ordersRes, carsRes] = await Promise.all([
          axios.get('/api/auth/users'),
          axios.get('/api/order'),
          axios.get('/api/cars')
        ]);
        setStatsData({
          users: usersRes.data,
          orders: ordersRes.data.orders,
          cars: carsRes.data
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    fetchStats();
  }, []);

  const renderSection = () => {
    switch (section) {
      case "dashboard": return <Dashboard stats={statsData} />;
      case "cars": return <Cars />;
      case "orders": return <Orders />;
      case "users": return <Users />;
      case "stats-users": return <StatsUsers users={statsData.users} />;
      case "stats-orders": return <StatsOrders orders={statsData.orders} />;
      case "stats-cars": return <StatsCars cars={statsData.cars} />;
      default: return <Dashboard stats={statsData} />;
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6 space-y-4">
        <h2 className="text-2xl font-bold text-amber-400">Admin Panel</h2>
        <nav className="space-y-2">
          <button onClick={() => setSection("dashboard")} className="block hover:text-amber-400">
            📊 Dashboard
          </button>

          <div>
            <button
              onClick={() => setOpenStats(!openStats)}
              className="block w-full text-left hover:text-amber-400"
            >
              📈 Statistici {openStats ? "▲" : "▼"}
            </button>
            {openStats && (
              <div className="ml-4 space-y-1 text-sm">
                <button onClick={() => setSection("stats-users")} className="block hover:text-amber-400">👤 Utilizatori</button>
                <button onClick={() => setSection("stats-orders")} className="block hover:text-amber-400">📦 Comenzi</button>
                <button onClick={() => setSection("stats-cars")} className="block hover:text-amber-400">🚗 Mașini</button>
              </div>
            )}
          </div>

          <button onClick={() => setSection("cars")} className="block hover:text-amber-400">
            🚙 Mașini
          </button>
          <button onClick={() => setSection("orders")} className="block hover:text-amber-400">
            📄 Comenzi
          </button>
          <button onClick={() => setSection("users")} className="block hover:text-amber-400">
            👥 Utilizatori
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 bg-gray-50 overflow-y-auto">
        {renderSection()}
      </main>
    </div>
  );
}