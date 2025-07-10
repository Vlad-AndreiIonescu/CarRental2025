import { Line, Bar } from "react-chartjs-2";

export default function StatsUsers({ users }) {
  // Procesează datele din users pentru grafice
  const processData = () => {
    const monthlyData = {};
    const roleData = { client: 0, admin: 0 };
    
    users.forEach(user => {
      // Procesare date lunare
      const month = new Date(user.createdAt).getMonth();
      monthlyData[month] = (monthlyData[month] || 0) + 1;
      
      // Procesare roluri
      roleData[user.role]++;
    });
    
    return { monthlyData, roleData };
  };

  const { monthlyData, roleData } = processData();

  const newUsers = {
    labels: ["Ian", "Feb", "Mar", "Apr", "Mai", "Iun"],
    datasets: [{
      label: "Utilizatori noi",
      data: Object.values(monthlyData),
      borderColor: "#3b82f6",
      backgroundColor: "#3b82f633",
      tension: 0.4,
      fill: true,
    }],
  };

  const roles = {
    labels: ["Client", "Admin"],
    datasets: [{
      label: "Utilizatori după rol",
      data: [roleData.client, roleData.admin],
      backgroundColor: ["#10b981", "#f59e0b"],
    }],
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