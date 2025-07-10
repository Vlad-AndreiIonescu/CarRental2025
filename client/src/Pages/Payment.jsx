import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const bookingData = state; // conține tot de la RentalSummary

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  // Dacă se accesează direct fără state, redirecționează
  useEffect(() => {
    if (!bookingData || !bookingData.car?._id) {
      toast.warn("Nu există detalii de rezervare.");
      navigate("/");
    }
  }, [bookingData, navigate]);

  const handleCreateOrder = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Trebuie să fii logat.");
        return;
      }
  
      // 1. Creează comanda (așa cum faci deja)
      const res = await fetch("https://carrental2025.onrender.com/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          car: bookingData.car._id,
          pickupLocation: bookingData.pickupLocation,
          pickupDate: bookingData.pickupDate,
          returnDate: bookingData.returnDate,
          extras: bookingData.extras,
          totalPrice: bookingData.totalPrice,
        }),
      });
  
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Eroare la creare comandă.");
  
      const orderId = data._id;
  
      // 2. Trimite către backend ca să creeze sesiunea Stripe
      const stripeRes = await fetch("https://carrental2025.onrender.com/api/stripe/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
          amount: data.totalPrice,
        }),
      });
  
      const stripeData = await stripeRes.json();
      if (!stripeRes.ok) throw new Error("Eroare la inițializarea plății.");
  
      // 3. Redirecționează spre pagina de plată Stripe
      window.location.href = stripeData.url;
  
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto text-center mt-10 p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Confirmă Plata</h2>
        <p className="mb-4 text-gray-600">
          Total de plată: <span className="text-green-600 font-semibold text-xl">€{bookingData?.totalPrice}</span>
        </p>
        <button
          onClick={handleCreateOrder}
          disabled={loading}
          className="bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700 transition"
        >
          {loading ? "Se procesează..." : "Plătește și Creează Comanda"}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-white rounded shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">Plata comenzii</h2>

      <div className="mb-4">
        <p><strong>ID Comandă:</strong> <span className="font-mono">{order._id}</span></p>
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Pickup:</strong> {new Date(order.pickupDate).toLocaleString()}</p>
        <p><strong>Return:</strong> {new Date(order.returnDate).toLocaleString()}</p>
        <p><strong>Locație ridicare:</strong> {order.pickupLocation}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Detalii mașină</h3>
        <ul className="list-disc list-inside">
          <li><strong>Marcă:</strong> {order.car?.make}</li>
          <li><strong>Model:</strong> {order.car?.model}</li>
          <li><strong>An:</strong> {order.car?.year}</li>
        </ul>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Extra-opțiuni</h3>
        {order.extras.length === 0 ? (
          <p className="text-gray-500">Nicio extra-opțiune selectată</p>
        ) : (
          <ul className="list-disc list-inside">
            {order.extras.map((extra, index) => (
              <li key={index}>{extra.name} - €{extra.price}</li>
            ))}
          </ul>
        )}
      </div>

      <hr className="my-6" />

      <div className="text-right text-lg font-semibold mb-6">
        Total de plată: <span className="text-green-600 text-2xl font-bold">€{order.totalPrice}</span>
      </div>
    </div>
  );
};

export default Payment;
