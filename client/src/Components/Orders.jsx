import { useEffect, useState } from "react";

export default function Cars() {
  const [cars, setCars] = useState([]);
  const [form, setForm] = useState({ make: "", model: "", pricePerDay: "" });
  const [image, setImage] = useState(null);

  const fetchCars = async () => {
    try {
      const res = await fetch("https://carrental2025.onrender.com/api/admin/cars", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setCars(data.cars || data);
    } catch (err) {
      console.error("Eroare la mașini:", err.message);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleSubmit = async () => {
    try {
      const res = await fetch("https://carrental2025.onrender.com/api/admin/cars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ ...form, image }),
      });

      if (res.ok) {
        const newCar = await res.json();
        setCars((prev) => [...prev, newCar]);
        setForm({ make: "", model: "", pricePerDay: "" });
        setImage(null);
      } else {
        console.error("Eroare la salvare mașină");
      }
    } catch (err) {
      console.error("Eroare la POST:", err.message);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">🚙 Mașini</h1>

      <div className="bg-white p-6 rounded shadow space-y-4">
        <h2 className="text-xl font-semibold">Adaugă Mașină</h2>

        <input
          placeholder="Marcă"
          className="border p-2 w-full"
          value={form.make}
          onChange={(e) => setForm({ ...form, make: e.target.value })}
        />
        <input
          placeholder="Model"
          className="border p-2 w-full"
          value={form.model}
          onChange={(e) => setForm({ ...form, model: e.target.value })}
        />
        <input
          placeholder="Preț/zi (€)"
          className="border p-2 w-full"
          value={form.pricePerDay}
          onChange={(e) => setForm({ ...form, pricePerDay: e.target.value })}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const reader = new FileReader();
            reader.onload = () => setImage(reader.result);
            reader.readAsDataURL(e.target.files[0]);
          }}
        />

        <button
          onClick={handleSubmit}
          className="bg-amber-500 text-white px-6 py-2 rounded"
        >
          Salvează
        </button>
      </div>

      <table className="w-full text-sm bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="py-2 px-3">Marcă</th>
            <th>Model</th>
            <th>Preț/zi</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((c) => (
            <tr key={c._id} className="border-b">
              <td className="py-2 px-3">{c.make}</td>
              <td>{c.model}</td>
              <td>€{c.pricePerDay}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
