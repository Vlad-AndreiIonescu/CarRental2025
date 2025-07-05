import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Pages/Home";
import CarDetails from "./Pages/CarDetails";
import Register from "./Pages/Register";  
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import RentalSummary from "./Pages/RentalSummary";
import Payment from "./Pages/Payment";
import GoogleMapsProvider from "./Components/GoogleMapsProvider"; 
import PaymentSuccess from "./Pages/PaymentSuccess";
import PaymentCancelled from "./Pages/PaymentCancelled";
import Landing from "./Pages/Landing"; 
import CarComparePage from "./Pages/CarComparePage"; 
import AdminLayout from "./Pages/AdminLayout";
const center = { lat: 44.4268, lng: 26.1025 }; // Bucharest

// Exemple de mașini (cu locații fictive)
const cars = [
  {
    _id: 1,
    make: "Tesla",
    model: "Model 3",
    pricePerDay: 100,
    location: { lat: 44.4378, lng: 26.0945 },
  },
  {
    _id: 2,
    make: "Toyota",
    model: "Corolla",
    pricePerDay: 50,
    location: { lat: 44.426, lng: 26.1 },
  },
  {
    _id: 3,
    make: "Ford",
    model: "Mustang",
    pricePerDay: 120,
    location: { lat: 44.4406, lng: 26.0847 },
  },
  {
    _id: 4,
    make: "BMW",
    model: "X5",
    pricePerDay: 150,
    location: { lat: 44.4234, lng: 26.1102 },
  },
];

const CarsByMaps = () => {
  const navigate = useNavigate();

  const handleNavigate = (carId) => {
    navigate(`/car/${carId}`);
  };

  return (
    <div className="h-screen w-full">
      <LoadScript googleMapsApiKey="AIzaSyCv1f2f0DvJKAecrirDunPovMVYGh6zscA">
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={center}
          zoom={13}
        >
          {cars.map((car) => (
            <MarkerF
              key={car._id}
              position={car.location}
              car={car}
              onNavigate={handleNavigate}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

const App = () => {
 

  return (
    <>
      <GoogleMapsProvider>
      <Router>
      <ToastContainer
    position="top-center"
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop
    closeOnClick
    pauseOnHover
    draggable
  />
        <Routes>
           <Route path="/" element={<Landing />} />
           <Route path="/home" element={<Home />} />
           <Route path="/compara" element={<CarComparePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/rental-summary" element={<RentalSummary />} />
          <Route path="/cars/:id" element={<CarDetails />} />
          <Route path="/cars-by-maps" element={<CarsByMaps />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/payment-success" element={<PaymentSuccess/>} />
          <Route path="/payment-cancelled" element={<PaymentCancelled/>} />
<Route path="/admin-preview" element={<AdminLayout />} />        </Routes>
      </Router>
      </GoogleMapsProvider>
    </>
  );
};


export default App;
