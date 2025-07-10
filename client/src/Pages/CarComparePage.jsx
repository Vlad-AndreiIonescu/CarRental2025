// pages/CarComparePage.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import clsx from "clsx";
import Navbar from "../Components/Navbar";

const featureKeys = [
  "hasGPS",
  "hasBluetooth",
  "hasParkingSensors",
  "hasSunroof",
  "hasCamera360",
  "hasHeatedSeats",
  "hasKeylessEntry",
  "hasCarPlay",
];

const featureLabels = {
  hasGPS: "GPS / Navigație",
  hasBluetooth: "Bluetooth",
  hasParkingSensors: "Senzori parcare",
  hasSunroof: "Trapă",
  hasCamera360: "Cameră 360°",
  hasHeatedSeats: "Scaune încălzite",
  hasKeylessEntry: "Keyless entry",
  hasCarPlay: "CarPlay / Android Auto",
};

// definiția atributelor comparate numeric
const numericAttributes = [
  { key: "year", label: "An fabricație", higherIsBetter: true },
  { key: "mileage", label: "Kilometraj (km)", higherIsBetter: false },
  { key: "horsepower", label: "Putere (CP)", higherIsBetter: true },
  { key: "torque", label: "Cuplu (Nm)", higherIsBetter: true },
  { key: "acceleration", label: "0-100 km/h (s)", higherIsBetter: false },
  { key: "topSpeed", label: "Viteză maximă (km/h)", higherIsBetter: true },
  { key: "rangeKm", label: "Autonomie (km)", higherIsBetter: true },
  { key: "co2Emission", label: "Emisii CO₂ (g/km)", higherIsBetter: false },
  { key: "seats", label: "Locuri", higherIsBetter: true },
  { key: "doors", label: "Uși", higherIsBetter: true },
  { key: "safetyRating", label: "Rating siguranță", higherIsBetter: true },
  { key: "pricePerDay", label: "Preț/zi (€)", higherIsBetter: false },
];

const CarComparePage = () => {
  const [cars, setCars] = useState([]);
  const [car1, setCar1] = useState(null);
  const [car2, setCar2] = useState(null);

  useEffect(() => {
    axios.get("https://carrental2025.onrender.com/api/cars").then((res) => setCars(res.data));
  }, []);

  /* ---------- helper pentru clasă culoare ---------- */
  const colorClass = (v1, v2, higherIsBetter) => {
    if (v1 == null || v2 == null) return "text-gray-700";
    if (v1 === v2) return "text-gray-700";

    const better = higherIsBetter ? v1 > v2 : v1 < v2;
    return better ? "text-green-600 font-semibold" : "text-red-500";
  };

  /* ---------- features check ---------- */
  const featureClass = (has, otherHas) => {
    if (has === otherHas) return "text-gray-700";
    return has ? "text-green-600 font-semibold" : "text-red-500";
  };

  /* ---------- render detalii mașină ---------- */
  const renderCarDetails = (car, otherCar) => {
    if (!car)
      return <div className="text-gray-400 italic">Neselectat</div>;

    return (
      <div className="space-y-3 text-sm text-gray-700">
        {/* Imagine */}
        <img
  src={car.image || "/default-car.png"}
  alt={`${car.make} ${car.model}`}
  className="w-full h-48 object-contain rounded-lg border mb-2 bg-white"
  onError={(e) => {
    e.target.onerror = null; // previne loop infinit dacă default.png lipsește
    e.target.src = "/default-car.png";
  }}
/>

        {/* General */}
        <div><strong>Marca:</strong> {car.make}</div>
        <div><strong>Model:</strong> {car.model}</div>
        <div><strong>Tip caroserie:</strong> {car.type}</div>

        {/* Atribute numerice comparabile */}
        {numericAttributes.map(({ key, label, higherIsBetter }) => (
          <div
            key={key}
            className={clsx(
              colorClass(car[key], otherCar?.[key], higherIsBetter)
            )}
          >
            <strong>{label}:</strong>{" "}
            {car[key] !== undefined ? car[key] : "—"}
          </div>
        ))}

        {/* Dotări boolean */}
        <div className="mt-3">
          <strong>Dotări:</strong>
          <ul className="mt-1 grid grid-cols-2 gap-1 list-none">
            {featureKeys.map((k) => (
              <li
                key={k}
                className={clsx(
                  featureClass(car[k], otherCar?.[k]),
                  "flex items-center gap-1"
                )}
              >
                {car[k] ? "✔︎" : "✖︎"} {featureLabels[k]}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  /* ---------- select handler ---------- */
  const handleSelect = (idx, id) => {
    const found = cars.find((c) => c._id === id);
    idx === 1 ? setCar1(found) : setCar2(found);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Compară două mașini
          </h2>
          <button
            onClick={() => (window.location.href = "/home")}
            className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded text-sm font-medium transition"
          >
            🡐 Înapoi la listă
          </button>
        </div>


        {/* Selectoare */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {[1, 2].map((idx) => (
            <div key={idx}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Alege Mașina {idx}
              </label>
              <select
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-amber-500 focus:border-amber-500"
                onChange={(e) => handleSelect(idx, e.target.value)}
              >
                <option value="">Selectează...</option>
                {cars.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.make} {c.model} ({c.year})
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* Comparație */}
        <div className="bg-white border border-gray-200 rounded-lg shadow overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x">
            <div className="p-6">
              {renderCarDetails(car1, car2)}
            </div>
            <div className="p-6">
              {renderCarDetails(car2, car1)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarComparePage;
