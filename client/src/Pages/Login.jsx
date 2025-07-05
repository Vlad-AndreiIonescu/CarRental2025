import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { validateLoginForm } from "../utils/validation";
import { saveAuthData } from "../utils/auth";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validateLoginForm(formData);
    if (error) {
      toast.error(error);
      return;
    }

    try {
      const response = await axios.post("/api/auth/login", formData);
      const token = response.data.token;
      const decodedUser = jwtDecode(token);

      saveAuthData(token, decodedUser); 

      toast.success("Autentificare reușită! Redirecționare...");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      toast.error(err.response?.data?.error || "Autentificare eșuată.");
      console.log(err.message);
    }
  };

  return (
    <>
      <ToastContainer position="bottom-right" autoClose={3000} />
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-6">
            <span className="text-amber-400">CAR</span>LUX Login
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
              Conectare
            </button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-4">
            Nu ai cont?{" "}
            <span
              className="text-amber-500 cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Înregistrează-te
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
