// src/Components/GoogleMapsProvider.jsx
import { LoadScript } from "@react-google-maps/api";

const GoogleMapsProvider = ({ children }) => {
  return (
    <LoadScript googleMapsApiKey="AIzaSyCv1f2f0DvJKAecrirDunPovMVYGh6zscA">
      {children}
    </LoadScript>
  );
};

export default GoogleMapsProvider;
