import { useState, useEffect } from "react";
import axios from "axios";
import clsx from "clsx";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get('/api/orders', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setOrders(res.data);
      } catch (error) {
        setError("Failed to fetch orders");
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const updateOrderStatus = async (id, newStatus) => {
    if (!window.confirm(`Are you sure you want to change this order's status to ${newStatus}?`)) return;
    
    try {
      await axios.patch(
        `/api/orders/${id}`,
        { status: newStatus },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      setOrders(orders.map(order => 
        order._id === id ? { ...order, status: newStatus } : order
      ));
    } catch (error) {
      setError("Failed to update order status");
      console.error("Error updating order:", error);
    }
  };

  const filteredOrders = orders.filter(order => {
    // Filter by status
    const statusMatch = selectedStatus === "all" || order.status === selectedStatus;
    
    // Filter by search term (ID, client name, or date)
    const searchMatch = 
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.date.includes(searchTerm);
    
    return statusMatch && searchMatch;
  });

  const statusOptions = [
    { value: "all", label: "Toate" },
    { value: "Confirmată", label: "Confirmate" },
    { value: "În așteptare", label: "În așteptare" },
    { value: "Anulată", label: "Anulate" },
    { value: "Finalizată", label: "Finalizate" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmată":
        return "bg-green-100 text-green-700";
      case "În așteptare":
        return "bg-yellow-100 text-yellow-800";
      case "Anulată":
        return "bg-red-100 text-red-700";
      case "Finalizată":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading && orders.length === 0) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">📦 Comenzi</h1>
        <p>Se încarcă...</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">📦 Comenzi</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Caută
          </label>
          <input
            type="text"
            id="search"
            placeholder="Caută după ID, client sau dată..."
            className="w-full p-2 border rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full md:w-64">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            id="status"
            className="w-full p-2 border rounded"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white shadow rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left bg-gray-100">
              <th className="py-3 px-4">ID</th>
              <th className="py-3 px-4">Client</th>
              <th className="py-3 px-4">Data</th>
              <th className="py-3 px-4">Mașină</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Total</th>
              <th className="py-3 px-4">Acțiuni</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-4 px-4 text-center text-gray-500">
                  Nu s-au găsit comenzi
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">#{order._id.slice(-6)}</td>
                  <td className="py-3 px-4">{order.clientName}</td>
                  <td className="py-3 px-4">{new Date(order.date).toLocaleDateString()}</td>
                  <td className="py-3 px-4">
                    {order.carMake} {order.carModel}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-medium">€{order.totalAmount}</td>
                  <td className="py-3 px-4 space-x-2">
                    {order.status === "În așteptare" && (
                      <>
                        <button
                          onClick={() => updateOrderStatus(order._id, "Confirmată")}
                          className="text-green-600 hover:text-green-800 text-sm"
                        >
                          Confirmă
                        </button>
                        <button
                          onClick={() => updateOrderStatus(order._id, "Anulată")}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Anulează
                        </button>
                      </>
                    )}
                    {order.status === "Confirmată" && (
                      <button
                        onClick={() => updateOrderStatus(order._id, "Finalizată")}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        Finalizează
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}