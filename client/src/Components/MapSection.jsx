import { GoogleMap, MarkerF } from "@react-google-maps/api";

const MapSection = ({ mapCenter, handleMapClick }) => {
  const containerStyle = {
    width: "100%",
    height: "300px",
  };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={mapCenter}
      zoom={12}
      onClick={handleMapClick}
    >
      <MarkerF position={mapCenter} />
    </GoogleMap>
  );
};

export default MapSection;
