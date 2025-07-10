import { useState, useEffect } from "react";
import axios from "axios";

export default function Cars() {
  const [form, setForm] = useState({
    make: "",
    type: "",
    year: "",
    pricePerDay: "",
    mileage: "0 km",
    transmission: "Manuală",
    fuelType: "Benzină",
    image: "placeholder.jpg",
    location: { lat: 0, lng: 0 },
    features: [],
    hasGPS: false,
    hasBluetooth: false,
    hasParkingSensors: false,
    hasSunroof: false,
    hasCamera360: false,
    hasHeatedSeats: false,
    hasKeylessEntry: false,
    hasCarPlay: false,
    depositRequired: false,
    minRentalDays: 1,
    insuranceIncluded: false,
    roadAssistanceIncluded: false,
    isAvailable: true,
  });

  const [cars, setCars] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [openSection, setOpenSection] = useState({
    general: true,
    specs: true,
    comfort: true,
    pricing: true,
  });

  const toggleSection = (section) => {
    setOpenSection((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const fetchCars = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/cars", {
        withCredentials: true,
      });
      setCars(res.data);
    } catch (err) {
      console.error("Eroare la fetch:", err);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    setForm((prev) => ({ ...prev, [name]: fieldValue }));
  };

  const handleSubmit = async () => {
    const payload = {
      ...form,
      year: parseInt(form.year),
      pricePerDay: parseFloat(form.pricePerDay),
    };

    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/cars/${editingId}`, payload, {
          withCredentials: true,
        });
      } else {
        await axios.post("http://localhost:5000/api/cars", payload, {
          withCredentials: true,
        });
      }
      await fetchCars();
      setForm({
        make: "",
        type: "",
        year: "",
        pricePerDay: "",
        mileage: "0 km",
        transmission: "Manuală",
        fuelType: "Benzină",
        type: "Sedan",
        image: "placeholder.jpg",
        location: { lat: 0, lng: 0 },
        features: [],
        hasGPS: false,
        hasBluetooth: false,
        hasParkingSensors: false,
        hasSunroof: false,
        hasCamera360: false,
        hasHeatedSeats: false,
        hasKeylessEntry: false,
        hasCarPlay: false,
        depositRequired: false,
        minRentalDays: 1,
        insuranceIncluded: false,
        roadAssistanceIncluded: false,
        isAvailable: true,
      });
      setEditingId(null);
    } catch (err) {
      console.error("Eroare la salvare:", err.response?.data || err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/cars/${id}`, {
        withCredentials: true,
      });
      setCars((prev) => prev.filter((car) => car._id !== id));
    } catch (err) {
      console.error("Eroare la ștergere:", err);
    }
  };

  const handleEdit = (car) => {
    setForm(car);
    setEditingId(car._id);
    setOpenSection((prev) => ({ ...prev, general: true }));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🚗 Mașini</h2>
      <div className="bg-white p-6 rounded shadow mb-6">
        <h3 className="text-lg font-semibold mb-2">Adaugă / Editează Mașină</h3>

        {/** General Section */}
        <div className="mb-4 border rounded">
          <button onClick={() => toggleSection("general")} className="w-full text-left bg-gray-100 px-4 py-2 font-medium">
            {openSection.general ? "🔽" : "▶️"} 1️⃣ General
          </button>
          {openSection.general && (
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="make" value={form.make} onChange={handleChange} placeholder="Marcă" className="border p-2 rounded" />
              <input name="type" value={form.type} onChange={handleChange} placeholder="type" className="border p-2 rounded" />
              <input name="year" value={form.year} onChange={handleChange} placeholder="An fabricație" className="border p-2 rounded" />
              <input name="pricePerDay" value={form.pricePerDay} onChange={handleChange} placeholder="Preț/zi (€)" className="border p-2 rounded" />
              <input name="type" value={form.type} onChange={handleChange} placeholder="Tip (ex. SUV)" className="border p-2 rounded" />
              <input name="fuelType" value={form.fuelType} onChange={handleChange} placeholder="Combustibil" className="border p-2 rounded" />
              <input name="transmission" value={form.transmission} onChange={handleChange} placeholder="Transmisie" className="border p-2 rounded" />
            </div>
          )}
        </div>

        {/** Comfort & Features */}
        <div className="mb-4 border rounded">
          <button onClick={() => toggleSection("comfort")} className="w-full text-left bg-gray-100 px-4 py-2 font-medium">
            {openSection.comfort ? "🔽" : "▶️"} 2️⃣ Dotări & Confort
          </button>
          {openSection.comfort && (
            <div className="p-4 grid grid-cols-2 gap-2">
              {[
                "hasGPS",
                "hasBluetooth",
                "hasParkingSensors",
                "hasSunroof",
                "hasCamera360",
                "hasHeatedSeats",
                "hasKeylessEntry",
                "hasCarPlay",
              ].map((feature) => (
                <label key={feature} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name={feature}
                    checked={form[feature]}
                    onChange={handleChange}
                  />
                  {feature.replace("has", "")}
                </label>
              ))}
            </div>
          )}
        </div>

        {/** Disponibilitate și alte opțiuni */}
        <div className="mb-4 border rounded">
          <button onClick={() => toggleSection("pricing")} className="w-full text-left bg-gray-100 px-4 py-2 font-medium">
            {openSection.pricing ? "🔽" : "▶️"} 3️⃣ Preț & Disponibilitate
          </button>
          {openSection.pricing && (
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="mileage" value={form.mileage} onChange={handleChange} placeholder="Kilometraj" className="border p-2 rounded" />
              <input name="image" value={form.image} onChange={handleChange} placeholder="Imagine" className="border p-2 rounded" />
              <label className="flex items-center gap-2">
                <input type="checkbox" name="depositRequired" checked={form.depositRequired} onChange={handleChange} />
                Garanție necesară
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="insuranceIncluded" checked={form.insuranceIncluded} onChange={handleChange} />
                Include asigurare
              </label>
            </div>
          )}
        </div>

        <button onClick={handleSubmit} className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600">
          {editingId ? "Salvează Modificările" : "Salvează"}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border border-gray-200 bg-white shadow">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-2 border">Marcă</th>
              <th className="p-2 border">type</th>
              <th className="p-2 border">An</th>
              <th className="p-2 border">Preț/zi (€)</th>
              <th className="p-2 border text-center">Acțiuni</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car._id} className="hover:bg-gray-50">
                <td className="p-2 border">{car.make}</td>
                <td className="p-2 border">{car.type}</td>
                <td className="p-2 border">{car.year}</td>
                <td className="p-2 border">{car.pricePerDay} €</td>
                <td className="p-2 border text-center space-x-2">
                  <button onClick={() => handleEdit(car)} className="text-blue-500 hover:underline">
                    ✏️ Edit
                  </button>
                  <button onClick={() => handleDelete(car._id)} className="text-red-500 hover:underline">
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
            {cars.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  Nu există mașini în baza de date.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}