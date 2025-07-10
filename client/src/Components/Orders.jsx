import { useEffect, useState } from "react";
import axios from "axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("https://carrental2025.onrender.com/api/order", {
  withCredentials: true,
});
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error("Eroare la obținerea comenzilor:", err);
      setError("Nu s-au putut încărca comenzile.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">📦 Comenzi</h1>

      {loading ? (
        <p className="text-gray-500">Se încarcă comenzile...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-500">Nu există comenzi.</p>
      ) : (
        <table className="w-full text-sm bg-white rounded shadow">
          <thead>
            <tr className="text-left border-b bg-gray-100">
              <th className="py-2 px-3">ID</th>
              <th>Client</th>
              <th>Mașină</th>
              <th>Pickup</th>
              <th>Returnare</th>
              <th>Status</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o._id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-3">{o._id}</td>
                <td>{o.user?.email || "-"}</td>
                <td>
                  {o.car?.make} {o.car?.model} ({o.car?.year})
                </td>
                <td>{new Date(o.pickupDate).toLocaleDateString()}</td>
                <td>{new Date(o.returnDate).toLocaleDateString()}</td>
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
                    {o.status || "În așteptare"}
                  </span>
                </td>
                <td>€{o.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
