import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Components/Navbar";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Eroare la user:", err);
        navigate("/login");
      }
    };

    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/order/my-orders", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
          }
        });
        const data = await res.json();
        setOrders(data.orders || []);
      } catch (err) {
        console.error("Eroare la comenzi:", err.message);
      }
    };

    fetchUser();
    fetchOrders();
  }, [navigate]);

  const processRefund = async ({ orderId, paymentIntentId, totalPrice }, refundType) => {
    setShowRefundModal(false);
    try {
      const res = await fetch("http://localhost:5000/api/stripe/refund", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ orderId, paymentIntentId, refundType }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Refund procesat cu succes.");
        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId
              ? { ...order, status: "refunded", refundMethod: refundType }
              : order
          )
        );
        if (refundType === "credit") {
          setUser((prev) => ({ ...prev, storeCredit: (prev.storeCredit || 0) + totalPrice }));
        }
      } else {
        toast.error(data.error || "Eroare la refund.");
      }
    } catch (err) {
      console.error("Refund error:", err.message);
      toast.error("Eroare refund.");
    }
  };

  return (
   <div className="min-h-screen bg-black text-gray-100">
      <ToastContainer position="bottom-right" autoClose={3000} />

      {/* Navbar */}
      <Navbar></Navbar>

      {/* Content */}
      <div className="w-full px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Profile Card */}
          <div className="bg-white text-gray-800 rounded-xl shadow-lg p-6 flex flex-col md:flex-row md:justify-between md:items-center">
            <div className="flex items-center space-x-4">
              <div className="bg-amber-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <div>
                <h2 className="text-2xl font-bold">Profilul Meu</h2>
                <p>{user?.email}</p>
              </div>
            </div>
            <div className="mt-4 md:mt-0 text-sm">
              <p>
                <strong>Rol:</strong> {user?.role}
              </p>
              <p>
                <strong>Înregistrat:</strong>{" "}
                {new Date(user?.createdAt).toLocaleDateString()}
              </p>
              <p>
                <strong>Store Credit:</strong>{" "}
                <span className="text-amber-500 font-semibold">
                  €{user?.storeCredit || 0}
                </span>
              </p>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white text-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">📦 Închirierile Mele</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-amber-100">
                  <tr>
                    <th className="px-4 py-2">Mașină</th>
                    <th className="px-4 py-2">Locație de preluare</th>
                    <th className="px-4 py-2">Locație de returnare</th>
                    <th className="px-4 py-2">Perioadă</th>
                    <th className="px-4 py-2">Total</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">Acțiuni</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length > 0 ? (
                    orders.map((order, idx) => (
                      <tr key={order._id} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                        <td className="px-4 py-2 text-center">{order.car?.make} {order.car?.model}</td>
                        <td className="px-4 py-2 text-center">{order.pickupLocation}</td>
                        <td className="px-4 py-2 text-center">{order.returnLocation}</td>

                        <td className="px-4 py-2 text-center">
                          {new Date(order.pickupDate).toLocaleDateString()} - {new Date(order.returnDate).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-2 text-center">€{order.totalPrice}</td>
                        <td className="px-4 py-2 text-center">
                          <span className={`font-semibold ${
                            order.status === "paid"
                              ? "text-green-600"
                              : order.status === "refunded"
                              ? "text-gray-500 italic"
                              : "text-red-600"
                          }`}>
                            {order.status}
                            {order.status === "refunded" && order.refundMethod && (
                              <span className="ml-1 text-xs text-gray-500">
                                ({order.refundMethod})
                              </span>
                            )}
                          </span>
                        </td>
                        <td className="px-4 py-2 text-center space-x-2">
                          <button
                            onClick={() => {
                              const doc = new jsPDF();
                              doc.setFont("helvetica");
                              doc.setFontSize(18);
                              doc.text("Confirmare Plata - CARLUX", 105, 20, { align: "center" });
                              const body = [
                                ["Nume Client", order.customerName || user?.name || user?.email || "Anonim"],
                                ["ID Comanda", order._id],
                                ["Locatie Ridicare", order.pickupLocation],
                                ["Locatie Returnare", order.returnLocation],
                                ["Data Preluare", new Date(order.pickupDate).toLocaleString()],
                                ["Data Returnare", new Date(order.returnDate).toLocaleString()],
                                ["Status", order.status],
                              ];
                              if (order.car) {
                                body.push(["Masina", `${order.car.make} ${order.car.model}`]);
                                body.push(["An fabricatie", order.car.year]);
                                body.push(["Pret/zi", `€${order.car.pricePerDay}`]);
                              }
                              autoTable(doc, {
                                startY: 30,
                                head: [["Detaliu", "Valoare"]],
                                body,
                                       headStyles: { fillColor: [255, 153, 0], textColor: [255, 255, 255] }, // fundal galben, text alb

                              });
                              if (order.extras?.length) {
                                const extras = order.extras.map((e) => [e.name, `€${e.price}`]);
                                autoTable(doc, {
                                  startY: doc.lastAutoTable.finalY + 10,
                                  head: [["Extra-opțiuni", "Preț"]],
                                  body: extras,
                                });
                              }
                              doc.setFontSize(14);
                              doc.text(`Total Platit: €${order.totalPrice}`, 105, doc.lastAutoTable.finalY + 20, { align: "center" });
                              doc.save(`Factura_${order._id}.pdf`);
                            }}
                            className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600 transition-colors"
                          >
                            📄 PDF
                          </button>
                          {order.status === "paid" && (
                            <button
                              onClick={() =>
                                setSelectedOrder({
                                  orderId: order._id,
                                  paymentIntentId: order.paymentIntentId,
                                  totalPrice: order.totalPrice,
                                }) || setShowRefundModal(true)
                              }
                              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                            >
                              ↩️ Refund
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-4 py-4 text-center text-gray-500">
                        Nu ai nicio închiriere înregistrată.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Refund Modal */}
      {showRefundModal && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-80">
            <h2 className="text-lg font-bold mb-4">Alege tipul de refund</h2>
            <div className="space-y-2">
              <button
                onClick={() => processRefund(selectedOrder, "money")}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                💶 Bani înapoi
              </button>
              <button
                onClick={() => processRefund(selectedOrder, "credit")}
                className="w-full px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                🪙 Store credit
              </button>
              <button
                onClick={() => setShowRefundModal(false)}
                className="w-full px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Anulează
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
