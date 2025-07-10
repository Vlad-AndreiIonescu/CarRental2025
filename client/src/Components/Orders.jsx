export default function Orders() {
  const orders = [
    {
      id: "ORD001",
      client: "Ion Popescu",
      date: "2025-06-10",
      status: "Confirmată",
      total: 180,
    },
    {
      id: "ORD002",
      client: "Ana Radu",
      date: "2025-06-11",
      status: "În așteptare",
      total: 260,
    },
    {
      id: "ORD003",
      client: "Mihai Enache",
      date: "2025-06-12",
      status: "Anulată",
      total: 0,
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">📦 Comenzi</h1>
      <table className="w-full text-sm bg-white rounded shadow">
        <thead>
          <tr className="text-left border-b bg-gray-100">
            <th className="py-2 px-3">ID</th>
            <th>Client</th>
            <th>Data</th>
            <th>Status</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} className="border-b hover:bg-gray-50">
              <td className="py-2 px-3">{o.id}</td>
              <td>{o.client}</td>
              <td>{o.date}</td>
              <td>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    o.status === "Confirmată"
                      ? "bg-green-100 text-green-700"
                      : o.status === "În așteptare"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {o.status}
                </span>
              </td>
              <td>€{o.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}