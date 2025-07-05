import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { validateRentalForm } from "../utils/validation";

// ─── helper: verifică validitatea JWT ───
const isTokenValid = (token) => {
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

const RentForm = ({
  car,
  pickupLocation,
  handleCitySelect,
  majorCities,
}) => {
  const navigate = useNavigate();

  // ----- state -----
  const [pickupDate, setPickupDate]     = useState("");
  const [returnDate, setReturnDate]     = useState("");
  const [returnLocation, setReturnLocation] = useState("");
  const [isLoggedIn, setIsLoggedIn]     = useState(false);

  // ----- efect: verificăm token-ul la mount -----
  useEffect(() => {
    setIsLoggedIn(isTokenValid(localStorage.getItem("token")));
  }, []);

  // ----- utilitate: calculează numărul de zile -----
  const calcRentalDays = (start, end) => {
    const d1 = new Date(start);
    const d2 = new Date(end);
    const diff = Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  // ----- submit -----
  const handleSubmit = (e) => {
    e.preventDefault();

    // 1) autentificare
    if (!isLoggedIn) {
      toast.error("Trebuie să fii autentificat pentru a face o rezervare.");
      navigate("/login");
      return;
    }

    // 2) validare
    const error = validateRentalForm(
      pickupDate,
      returnDate,
      pickupLocation,
      returnLocation
    );
    if (error) {
      toast.error(error);
      return;
    }

    // 3) navigare către sumar
    navigate("/rental-summary", {
      state: {
        car,
        pickupLocation,
        returnLocation,
        pickupDate,
        returnDate,
        rentalDays: calcRentalDays(pickupDate, returnDate),
      },
    });
  };

  const todayISO = new Date().toISOString().slice(0, 16);

  // ----- render -----
  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {/* pickup date */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Data si timpul de preluare
        </label>
        <input
          type="datetime-local"
          className="w-full p-2 border rounded"
          value={pickupDate}
          min={todayISO}
          onChange={(e) => setPickupDate(e.target.value)}
        />
      </div>

      {/* return date */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
            Data si timpul de returnare
        </label>
        <input
          type="datetime-local"
          className="w-full p-2 border rounded"
          value={returnDate}
          min={pickupDate || todayISO}
          onChange={(e) => setReturnDate(e.target.value)}
        />
      </div>

      {/* pickup location */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
         Locatia de preluare
        </label>
        <select
          className="w-full p-2 border rounded"
          value={pickupLocation}
          onChange={handleCitySelect}
        >
          <option value="">Alege sediu</option>
          {majorCities.map((c) => (
            <option key={c.name} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* return location (nou) */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Locatia de returnare
        </label>
        <select
          className="w-full p-2 border rounded"
          value={returnLocation}
          onChange={(e) => setReturnLocation(e.target.value)}
        >
          <option value="">Alege sediu</option>
          {majorCities.map((c) => (
            <option key={c.name} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* buton submit */}
      <button
        type="submit"
        disabled={!isLoggedIn}
        className={`w-full px-4 py-2 rounded transition-colors
          ${
            isLoggedIn
              ? "bg-amber-500 text-white hover:bg-amber-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
      >
        Confirma inchirierea
      </button>

      {/* mesaj pt. user neautentificat */}
      {!isLoggedIn && (
        <p className="text-sm text-red-500 mt-2 text-center">
          Trebuie să fii conectat pentru a face o rezervare.{" "}
          <span
            onClick={() => navigate("/login")}
            className="underline cursor-pointer text-amber-600 hover:text-amber-700"
          >
            Autentifică-te aici.
          </span>
        </p>
      )}
    </form>
  );
};

export default RentForm;
