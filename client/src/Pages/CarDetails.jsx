import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import LeftSection from "../Components/LeftSection";
import RightSection from "../Components/RightSection";
import { toast } from "react-toastify";

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  const [mapCenter, setMapCenter] = useState({ lat: 44.4268, lng: 26.1025 });
  const [pickupLocation, setPickupLocation] = useState("");

  const majorCities = [
    { name: "Bucharest", lat: 44.4268, lng: 26.1025 },
    { name: "Cluj", lat: 46.7712, lng: 23.6236 },
    { name: "Timisoara", lat: 45.7489, lng: 21.2087 },
    { name: "Iasi", lat: 47.1585, lng: 27.6014 },
    { name: "Constanta", lat: 44.1598, lng: 28.6348 },
  ];

  const [reviews, setReviews] = useState([]);

  const handleAddReview = (newReview) => {
    setReviews([...reviews, newReview]);
  };

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await fetch(`/api/cars/${id}`);
        const data = await response.json();
        setCar(data);
        if (data.location) {
          setMapCenter(data.location);
          setPickupLocation(data.location.name || "");
        }
      } catch (error) {
        console.error("Failed to fetch car details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [id]);

  const handleCitySelect = (e) => {
    const selected = majorCities.find((city) => city.name === e.target.value);
    if (selected) {
      setPickupLocation(selected.name);
      setMapCenter({ lat: selected.lat, lng: selected.lng });
    }
  };

  const handleMapClick = (e) => {
    const clickedLat = e.latLng.lat();
    const clickedLng = e.latLng.lng();
  
    const toRadians = (deg) => (deg * Math.PI) / 180;
  
    const distance = (lat1, lng1, lat2, lng2) => {
      const dLat = toRadians(lat2 - lat1);
      const dLng = toRadians(lng2 - lng1); // ✅ corect aici!
      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLng / 2) ** 2;
      return 6371 * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))); // în km
    };
  
    let closestCity = null;
    let minDistance = Infinity;
  
    for (const city of majorCities) {
      const dist = distance(clickedLat, clickedLng, city.lat, city.lng);
      if (dist <= 15) {
        setPickupLocation(city.name);
        setMapCenter({ lat: clickedLat, lng: clickedLng });
        return;
      }
      if (dist < minDistance) {
        minDistance = dist;
        closestCity = city;
      }
    }
  
    // Dacă e prea departe de orice oraș cu sediu
    if (closestCity) {
      toast.warn(`Locația aleasă este prea departe. Am setat orașul cel mai apropiat: ${closestCity.name}`);
      setPickupLocation(closestCity.name);
      setMapCenter({ lat: closestCity.lat, lng: closestCity.lng });
    }
  };

  if (loading) return <div className="text-center p-6">Loading...</div>;
  if (!car) return <div className="text-center p-6">Car not found.</div>;

  return (
    <div className="bg-gray-50 min-h-screen">
  <Navbar />
  <div className="max-w-[1600px] mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10 min-h-[calc(100vh-4rem)] items-stretch">

        <LeftSection car={car} reviews={reviews} handleAddReview={handleAddReview} />
          <RightSection
            car={car}
            pickupLocation={pickupLocation}
            handleCitySelect={handleCitySelect}
            majorCities={majorCities}
            mapCenter={mapCenter}
            handleMapClick={handleMapClick}
          />
        </div>
    </div>
  );
};

export default CarDetails;
