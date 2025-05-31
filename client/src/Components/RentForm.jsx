import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RentForm = ({ car, pickupLocation, handleCitySelect, majorCities }) => {
  const navigate = useNavigate();

  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const calcRentalDays = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = endDate - startDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!pickupDate || !returnDate || !pickupLocation) {
      alert("Please fill in all fields!");
      return;
    }

    navigate("/rental-summary", {
      state: {
        car,
        pickupLocation,
        pickupDate,
        returnDate,
        rentalDays: calcRentalDays(pickupDate, returnDate),
      },
    });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium text-gray-700">Pickup Date & Time</label>
        <input
          type="datetime-local"
          className="w-full p-2 border rounded"
          value={pickupDate}
          onChange={(e) => setPickupDate(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Return Date & Time</label>
        <input
          type="datetime-local"
          className="w-full p-2 border rounded"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Pickup Location</label>
        <select
          className="w-full p-2 border rounded"
          value={pickupLocation}
          onChange={handleCitySelect}
        >
          <option value="">Select a city</option>
          {majorCities.map((city) => (
            <option key={city.name} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600 transition-colors w-full"
      >
        Confirm Rental
      </button>
    </form>
  );
};

export default RentForm;
