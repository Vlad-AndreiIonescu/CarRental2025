import { useState, useEffect } from "react";
import axios from "axios";
import clsx from "clsx";

export default function Cars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const emptyForm = {
    // GENERAL
    make: "",
    model: "",
    type: "",
    year: "",
    mileage: "",
    transmission: "",
    fuelType: "",
    engineType: "",
    driveType: "",
    // TECH
    horsepower: "",
    torque: "",
    acceleration: "",
    topSpeed: "",
    rangeKm: "",
    co2Emission: "",
    // CONFORT / FEATURES
    hasGPS: false,
    hasBluetooth: false,
    hasParkingSensors: false,
    hasSunroof: false,
    hasCamera360: false,
    hasHeatedSeats: false,
    hasKeylessEntry: false,
    hasCarPlay: false,
    seats: "",
    doors: "",
    colorExterior: "",
    colorInterior: "",
    // PRICE
    pricePerDay: "",
    discount: "",
    depositRequired: false,
    minRentalDays: 1,
    isAvailable: true,
    // IMAGE
    image: "",
  };
  const [form, setForm] = useState(emptyForm);
  const [imgPreview, setImgPreview] = useState(null);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const res = await axios.get('/api/cars');
        setCars(res.data);
      } catch (error) {
        setError("Failed to fetch cars");
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImgPreview(reader.result);
      setForm({ ...form, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      if (editingId) {
        // Update existing car
        const res = await axios.put(`/api/cars/${editingId}`, form, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setCars(cars.map(car => car._id === editingId ? res.data : car));
      } else {
        // Create new car
        const res = await axios.post('/api/cars', form, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setCars([...cars, res.data]);
      }
      
      setForm(emptyForm);
      setImgPreview(null);
      setEditingId(null);
    } catch (error) {
      setError(error.response?.data?.message || "Error saving car");
      console.error("Error saving car:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this car?")) return;
    
    try {
      await axios.delete(`/api/cars/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setCars(cars.filter(car => car._id !== id));
    } catch (error) {
      setError("Failed to delete car");
      console.error("Error deleting car:", error);
    }
  };

  const handleEdit = (car) => {
    setForm(car);
    setEditingId(car._id);
    setImgPreview(car.image || null);
  };

  // toggle acordion
  const [open, setOpen] = useState("general");
  const Section = ({ id, title, children }) => (
    <div className="border rounded mb-4">
      <button
        onClick={() => setOpen(open === id ? "" : id)}
        className="w-full flex justify-between items-center px-4 py-2 bg-gray-100 font-medium"
      >
        {title} <span>{open === id ? "−" : "+"}</span>
      </button>
      {open === id && <div className="p-4 grid md:grid-cols-2 gap-4">{children}</div>}
    </div>
  );

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold flex items-center gap-2">
        🚙 Mașini
      </h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* FORMULAR */}
      <div className="bg-white shadow rounded p-6">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? "Editează Mașină" : "Adaugă Mașină"}
        </h2>

        {/* IMAGE */}
        <div className="mb-6">
          <label className="font-medium block mb-1">Imagine</label>
          {imgPreview && (
            <img
              src={imgPreview}
              alt="preview"
              className="h-32 object-cover rounded mb-2"
            />
          )}
          <input type="file" accept="image/*" onChange={handleFile} />
        </div>

        {/* ACCORDIONS */}
        <form onSubmit={handleSubmit}>
          <Section id="general" title="1️⃣ General">
            {[
              ["make", "Marcă"],
              ["model", "Model"],
              ["type", "Tip caroserie"],
              ["year", "An fabricație"],
              ["mileage", "Kilometraj"],
              ["transmission", "Transmisie"],
              ["fuelType", "Combustibil"],
              ["engineType", "Motor"],
              ["driveType", "Tracțiune"],
            ].map(([k, ph]) => (
              <input
                key={k}
                placeholder={ph}
                className="border p-2 rounded"
                value={form[k]}
                onChange={(e) => setForm({ ...form, [k]: e.target.value })}
              />
            ))}
          </Section>

          <Section id="tech" title="2️⃣ Specificații tehnice">
            {[
              ["horsepower", "CP"],
              ["torque", "Cuplu (Nm)"],
              ["acceleration", "0-100 km/h (s)"],
              ["topSpeed", "Viteză max (km/h)"],
              ["rangeKm", "Autonomie (km)"],
              ["co2Emission", "CO₂ (g/km)"],
            ].map(([k, ph]) => (
              <input
                key={k}
                placeholder={ph}
                className="border p-2 rounded"
                value={form[k]}
                onChange={(e) => setForm({ ...form, [k]: e.target.value })}
              />
            ))}
          </Section>

          <Section id="features" title="3️⃣ Dotări & Confort">
            {/* boolean features as toggles */}
            {[
              ["hasGPS", "GPS"],
              ["hasBluetooth", "Bluetooth"],
              ["hasParkingSensors", "Senzori parcare"],
              ["hasSunroof", "Trapă"],
              ["hasCamera360", "Camera 360"],
              ["hasHeatedSeats", "Scaune încălzite"],
              ["hasKeylessEntry", "Keyless entry"],
              ["hasCarPlay", "CarPlay / Android Auto"],
            ].map(([k, lbl]) => (
              <label key={k} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form[k]}
                  onChange={(e) => setForm({ ...form, [k]: e.target.checked })}
                />
                {lbl}
              </label>
            ))}

            {[
              ["seats", "Locuri"],
              ["doors", "Uși"],
              ["colorExterior", "Culoare exterior"],
              ["colorInterior", "Culoare interior"],
            ].map(([k, ph]) => (
              <input
                key={k}
                placeholder={ph}
                className="border p-2 rounded"
                value={form[k]}
                onChange={(e) => setForm({ ...form, [k]: e.target.value })}
              />
            ))}
          </Section>

          <Section id="price" title="4️⃣ Preț & Disponibilitate">
            {[
              ["pricePerDay", "Preț/zi (€)"],
              ["discount", "Discount (%)"],
              ["minRentalDays", "Zile minime"],
            ].map(([k, ph]) => (
              <input
                key={k}
                placeholder={ph}
                className="border p-2 rounded"
                value={form[k]}
                onChange={(e) => setForm({ ...form, [k]: e.target.value })}
              />
            ))}

            {/* deposit & available switches */}
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.depositRequired}
                onChange={(e) =>
                  setForm({ ...form, depositRequired: e.target.checked })
                }
              />
              Depozit necesar
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.isAvailable}
                onChange={(e) =>
                  setForm({ ...form, isAvailable: e.target.checked })
                }
              />
              Disponibil
            </label>
          </Section>

          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-amber-500 text-white px-6 py-2 rounded"
              disabled={loading}
            >
              {loading ? "Se salvează..." : (editingId ? "Actualizează" : "Salvează")}
            </button>
            
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setForm(emptyForm);
                  setImgPreview(null);
                  setEditingId(null);
                }}
                className="bg-gray-500 text-white px-6 py-2 rounded"
              >
                Anulează
              </button>
            )}
          </div>
        </form>
      </div>

      {/* LISTĂ MAȘINI */}
      {loading && cars.length === 0 ? (
        <div>Se încarcă...</div>
      ) : (
        <div className="bg-white shadow rounded overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-3 px-4">Imagine</th>
                <th>Marcă</th>
                <th>Model</th>
                <th>An</th>
                <th>Preț/zi</th>
                <th>Disponibil</th>
                <th>Acțiuni</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => (
                <tr key={car._id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">
                    {car.image && (
                      <img
                        src={car.image}
                        alt={car.make}
                        className="h-12 w-16 object-cover rounded"
                      />
                    )}
                  </td>
                  <td className="py-2 px-4">{car.make}</td>
                  <td>{car.model}</td>
                  <td>{car.year}</td>
                  <td>€{car.pricePerDay}</td>
                  <td>
                    <span
                      className={clsx(
                        "inline-block w-3 h-3 rounded-full mr-1",
                        car.isAvailable ? "bg-green-500" : "bg-red-500"
                      )}
                    ></span>
                    {car.isAvailable ? "Da" : "Nu"}
                  </td>
                  <td className="py-2 px-4 space-x-2">
                    <button
                      onClick={() => handleEdit(car)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(car._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}