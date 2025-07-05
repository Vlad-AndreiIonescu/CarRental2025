import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LeftExtrasSection from "../Components/LeftExtrasSection";
import { toast } from "react-toastify";
import Navbar from "../Components/Navbar";

const RentalSummary = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(state);

  const [extras, setExtras] = useState([
    { name: "Protecție Totală (Zero Franșiză)", price: 12, selected: false },
    { name: "Returnare fără Curățare", price: 8, selected: false },
    { name: "Asigurare Suplimentară", price: 15, selected: false },
    { name: "Șofer Adițional", price: 10, selected: false },
    { name: "GPS Inclus", price: 7, selected: false },
    { name: "Scaun pentru Copii", price: 6, selected: false },
    { name: "Lanțuri de Zăpadă", price: 5, selected: false },
    { name: "Asigurare Furt/Avarii", price: 9, selected: false },
    { name: "Wi-Fi în Mașină", price: 4, selected: false },
    { name: "Asistență Rutieră Premium", price: 6, selected: false },
  ]);

  const [storeCredit, setStoreCredit] = useState(0);
  const [useCredit, setUseCredit] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
const [discountApplied, setDiscountApplied] = useState(0); // valoare în euro

  useEffect(() => {
    const fetchCarDetails = async () => {
      if (!booking?.car?.pricePerDay && booking?.car?._id) {
        try {
          const res = await fetch(`https://carrental2025.onrender.com/api/car/${booking.car._id}`);
          const data = await res.json();
          setBooking(prev => ({ ...prev, car: data }));
        } catch (error) {
          console.error("Eroare la încărcarea mașinii:", error);
          toast.error("Eroare la încărcarea datelor mașinii.");
        }
      }
    };

    const fetchUserCredit = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("https://carrental2025.onrender.com/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setStoreCredit(data.storeCredit || 0);
      } catch (err) {
        console.error("Eroare la preluarea creditului:", err);
      }
    };

    fetchCarDetails();
    fetchUserCredit();
  }, [booking]);

  if (!booking || !booking.car) {
    return <div className="text-center p-6">Se încarcă datele rezervării...</div>;
  }

  const toggleExtra = (index) => {
    const newExtras = [...extras];
    newExtras[index].selected = !newExtras[index].selected;
    setExtras(newExtras);
  };

const handleApplyDiscount = async () => {
  const token = localStorage.getItem("token");
  const code = discountCode.trim().toUpperCase();

  try {
    const res = await fetch("/api/discount/apply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ code })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Eroare la aplicarea codului");
    }

    setDiscountApplied(data.value);
    toast.success(`Codul a fost aplicat: -€${data.value}`);
  } catch (err) {
    setDiscountApplied(0);
    toast.error(err.message);
  }
};

  const selectedExtras = extras.filter((extra) => extra.selected);
  const extrasTotal = selectedExtras.reduce((acc, extra) => acc + extra.price, 0);
  const rentalTotal = (booking.car.pricePerDay || 0) * booking.rentalDays;
  const totalPriceBeforeApplying = rentalTotal + extrasTotal;
  const creditToUse = useCredit ? Math.min(storeCredit, totalPriceBeforeApplying) : 0;
  const remainingToPayAfterApplying = (totalPriceBeforeApplying - creditToUse).toFixed(2);
  const finalTotal = (remainingToPayAfterApplying - discountApplied >= 0
  ? remainingToPayAfterApplying - discountApplied
  : 0
).toFixed(2);

 const handleProceedToPayment = async () => {
  const token = localStorage.getItem("token");

  if (!token || token === "undefined" || token === "") {
    toast.error("Trebuie să fii conectat pentru a efectua rezervarea.");
    return;
  }

  try {
    const response = await fetch("https://carrental2025.onrender.com/api/stripe/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        car: booking.car._id,
        pickupLocation: booking.pickupLocation,
        returnLocation: booking.returnLocation,
        pickupDate: booking.pickupDate,
        returnDate: booking.returnDate,
        extras: selectedExtras,
        rentalDays: booking.rentalDays,
        totalPriceBeforeApplying,
        remainingToPayAfterApplying,
        useCredit,
        creditUsed: useCredit ? creditToUse : 0,
         discountCode,              // ex: "VIP25"
    discountValue: discountApplied  // ex: 25 (euro)
      }),
    });

    if (response.status === 401 || response.status === 403) {
      toast.error("Token-ul tău a expirat. Te rugăm să te reconectezi.");
      return;
    }

    const data = await response.json();
    if (response.ok && data.url) {
      window.location.href = data.url;
    } else {
      throw new Error(data.error || "Eroare la inițializarea sesiunii Stripe.");
    }
  } catch (err) {
    toast.error("Stripe session failed.");
    console.error(err.message);
  }
};


  return (
    <>
    <Navbar/>
    <div className="max-w-7xl mx-auto p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      <LeftExtrasSection extras={extras} toggleExtra={toggleExtra} />

      <div className="shadow-md rounded-lg p-6 bg-white">
        <h2 className="text-2xl font-bold mb-4">📋 Rezumat Închiriere</h2>
        <p><strong>Locație Preluare:</strong> {booking.pickupLocation}</p>
        <p><strong>Locație Returnare:</strong> {booking.returnLocation}</p>
        <p><strong>Data Preluare:</strong> {new Date(booking.pickupDate).toLocaleString()}</p>
        <p><strong>Data Returnare:</strong> {new Date(booking.returnDate).toLocaleString()}</p>
        <p><strong>Zile:</strong> {booking.rentalDays}</p>
        <hr className="my-4" />
        <p className="font-semibold">Extras:</p>
        {selectedExtras.length ? (
          <ul className="list-disc pl-5">
            {selectedExtras.map((extra, index) => (
              <li key={index}>{extra.name} - €{extra.price}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Nicio opțiune selectată</p>
        )}

        <hr className="my-4" />
        <div className="text-lg font-semibold">
          Total: <div className="text-lg font-semibold mt-4">
  Total:{" "}
  <span
    className={`${(useCredit || discountApplied) ? 'line-through text-red-600 mr-2' : ''}`}
  >
    €{totalPriceBeforeApplying.toFixed(2)}
  </span>

  {(useCredit || discountApplied) && (
    <span className="text-green-600 font-bold">€{finalTotal}</span>
  )}
</div>
        </div>

        {storeCredit > 0 && (
          <div className="mt-4 bg-gray-100 p-3 rounded">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={useCredit}
                onChange={(e) => setUseCredit(e.target.checked)}
                className="form-checkbox mr-2"
              />
              Folosește store credit (disponibil: €{storeCredit})
            </label>
            {useCredit && (
              <p className="text-sm mt-1 text-gray-700">
                Se vor folosi €{creditToUse} din credit. Diferență de plată: €{remainingToPayAfterApplying}
              </p>
            )}
          </div>
        )}
        <div className="mt-4">
  <label className="font-semibold block mb-1">Cod Discount</label>
  <div className="flex gap-2">
    <input
      type="text"
      value={discountCode}
      onChange={(e) => setDiscountCode(e.target.value)}
      placeholder="Introdu codul aici"
      className="flex-1 border border-gray-300 px-3 py-2 rounded"
    />
    <button
      onClick={handleApplyDiscount}
      className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded"
    >
      Aplică
    </button>
  </div>
  {discountApplied > 0 && (
    <p className="text-green-600 text-sm mt-1">Reducere aplicată: -€{discountApplied}</p>
  )}
</div>


        <button
          onClick={handleProceedToPayment}
          className="mt-6 w-full bg-amber-500 text-white px-6 py-2 rounded hover:bg-amber-600 transition"
        >
          Continuă către plată
        </button>
      </div>
    </div>
    </>
  );
  
};

export default RentalSummary;