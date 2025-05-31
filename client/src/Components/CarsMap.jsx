// CarsMap.js
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Link } from 'react-router-dom';

const defaultIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const clusterIcon = (count) => {
  return L.divIcon({
    html: `<div class="flex items-center justify-center w-9 h-9 rounded-full bg-amber-500 text-white font-bold text-sm border-2 border-white shadow-md">${count}</div>`,
    className: '',
    iconSize: [36, 36],
    iconAnchor: [18, 18]
  });
};

const carIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/3097/3097180.png', // URL pentru iconița de mașină
  iconRetinaUrl: 'https://cdn-icons-png.flaticon.com/512/3097/3097180.png', // Aceeași pentru Retina
  iconSize: [30, 30], // Dimensiuni ajustate
  iconAnchor: [15, 30], // Ajustează punctul de ancorare
  popupAnchor: [0, -30], // Ajustează poziția popup-ului
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png', // Păstrează umbra
  shadowSize: [41, 41]
});

const CarsMap = ({ locationGroups }) => {
  const center = locationGroups.length > 0 
    ? [locationGroups[0].location.lat, locationGroups[0].location.lng] 
    : [44.4268, 26.1025];

  return (
    <MapContainer 
      center={center} 
      zoom={12} 
      style={{ height: '100%', width: '100%' }}
      className="rounded-lg shadow-lg"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {locationGroups.map((group, index) => (
        <Marker
          key={index}
          position={[group.location.lat, group.location.lng]}
          icon={group.cars.length > 1 ? clusterIcon(group.cars.length) : carIcon}
        >
          <Popup className="custom-popup" maxWidth={400} minWidth={300}>
            <div className="max-h-[70vh] overflow-y-auto p-2">
              <h3 className="text-lg font-bold mb-3 text-amber-600 border-b pb-2">
                {group.cars.length} mașini disponibile
                {group.location.city && (
                  <span className="block text-sm font-normal text-gray-600">{group.location.city}</span>
                )}
              </h3>
              
              <div className="space-y-4">
                {group.cars.map(car => (
                  <div key={car._id} className="border-b border-gray-100 pb-3 last:border-0">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-24 h-16 bg-gray-100 rounded overflow-hidden">
                        <img 
                          src={car.image || '/default-car.jpg'} 
                          alt={`${car.make} ${car.model}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-bold text-gray-800">{car.make} {car.model}</h4>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm mt-1">
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clipRule="evenodd" />
                            </svg>
                            {car.horsepower} CP
                          </span>
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            {car.pricePerDay}€/zi
                          </span>
                          {car.fuelType && (
                            <span className="flex items-center">
                              <svg className="w-4 h-4 mr-1 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z" clipRule="evenodd" />
                              </svg>
                              {car.fuelType}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <Link 
                      to={`/cars/${car._id}`}
                      className="mt-2 inline-block w-full text-center py-1 px-3 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium rounded transition-colors"
                    >
                      Vezi detalii
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default CarsMap;