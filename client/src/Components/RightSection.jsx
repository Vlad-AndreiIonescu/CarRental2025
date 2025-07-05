import MapSection from "./MapSection";
import RentForm from "./RentForm"; // asigură-te că ai importat RentForm!

const RightSection = ({ car, pickupLocation, handleCitySelect, majorCities, mapCenter, handleMapClick }) => {
  return (
  <div className="bg-gray-100 p-6 shadow-md rounded-lg space-y-6 sticky top-20 self-start">

      <div>
        <h2 className="text-xl font-bold mb-4">Începe inchirierea</h2>
        <RentForm
          car={car}                    
          pickupLocation={pickupLocation}
          handleCitySelect={handleCitySelect}
          majorCities={majorCities}
        />
      </div>
      <MapSection
        mapCenter={mapCenter}
        handleMapClick={handleMapClick}
      />
    </div>
  );
};

export default RightSection;
