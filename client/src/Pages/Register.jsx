import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Toate câmpurile sunt obligatorii!");
      return;
    }

    try {
      await axios.post("https://carrental2025.onrender.com/api/auth/register", formData);
      toast.success("Înregistrare reușită! Redirecționare...");
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      toast.error(
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Înregistrare eșuată."
      );
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          <span className="text-amber-400">CAR</span>LUX Register
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Nume"
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Parolă"
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
            value={formData.password}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-amber-500 hover:bg-amber-600 text-white py-3 rounded font-semibold transition"
          >
            Înregistrează-te
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Ai deja cont? <span className="text-amber-500 cursor-pointer" onClick={() => navigate("/login")}>Conectează-te</span>
        </p>
      </div>
    </div>
  );
};

export default Register;
