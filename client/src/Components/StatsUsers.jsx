import { Line, Bar } from "react-chartjs-2";

export default function StatsUsers({ users }) {
  // ✅ Fallback: dacă users nu este array, afișăm mesaj de încărcare
  if (!Array.isArray(users)) {
    return <p className="text-gray-500">Se încarcă datele utilizatorilor...</p>;
  }

  // ✅ Procesare sigură
  const processData = () => {
    const monthlyData = {};
    const roleData = { client: 0, admin: 0 };

    users.forEach(user => {
      // Procesare date lunare
      const month = new Date(user.createdAt).getMonth();
      monthlyData[month] = (monthlyData[month] || 0) + 1;

      // Procesare roluri
      if (roleData[user.role] !== undefined) {
        roleData[user.role]++;
      }
    });

    return { monthlyData, roleData };
  };

  const { monthlyData, roleData } = processData();

  const newUsers = {
    labels: ["Ian", "Feb", "Mar", "Apr", "Mai", "Iun", "Iul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [{
      label: "Utilizatori noi",
      data: Array.from({ length: 12 }, (_, i) => monthlyData[i] || 0), // ✅ completăm toate lunile
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
