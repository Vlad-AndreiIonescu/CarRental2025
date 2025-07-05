import { useState } from "react";
import Dashboard from "../Components/Dashboard";
import Cars from "../Components/Cars";
import Orders from "../Components/Orders";
import Users from "../Components/Users";
import Statistics from "../Components/Statistics";
import StatsUsers from "../Components/StatsUsers";
import StatsOrders from "../Components/StatsOrders";
import StatsCars from "../Components/StatsCars";

export default function AdminLayout() {

  const [section, setSection] = useState("dashboard");
const [openStats, setOpenStats] = useState(false);

  const renderSection = () => {
    switch (section) {
  case "dashboard": return <Dashboard />;
  case "cars": return <Cars />;
  case "orders": return <Orders />;
  case "users": return <Users />;
  case "stats-users": return <StatsUsers />;
  case "stats-orders": return <StatsOrders />;
  case "stats-cars": return <StatsCars />;
  default: return <Dashboard />;
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
