import { useState } from "react";
import clsx from "clsx";

export default function Cars() {
  const [cars, setCars] = useState([]);
  const empty = {
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
    // IMAGE
    image: "",
  };
  const [form, setForm] = useState(empty);
  const [imgPreview, setImgPreview] = useState(null);

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

  // doar demo local
  const handleSubmit = () => {
    console.table(form);
    setCars([...cars, { ...form, id: Date.now() }]);
    setForm(empty);
    setImgPreview(null);
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

      {/* FORMULAR */}
      <div className="bg-white shadow rounded p-6">
        <h2 className="text-xl font-semibold mb-4">Adaugă / Editează Mașină</h2>

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

        <button
          onClick={handleSubmit}
          className="bg-amber-500 text-white px-6 py-2 rounded"
        >
          Salvează
        </button>
      </div>

      {/* LISTĂ SIMPLĂ */}
      <table className="w-full text-sm bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="py-2 px-3">Marcă</th>
            <th>Model</th>
            <th>An</th>
            <th>Preț</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((c) => (
            <tr key={c.id} className="border-b">
              <td className="py-2 px-3">{c.make}</td>
              <td>{c.model}</td>
              <td>{c.year}</td>
              <td>€{c.pricePerDay}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
