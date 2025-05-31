import { Link } from "react-router-dom";

const CarCard = ({ car }) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col justify-between">
    <div>
      <div className="relative h-48 bg-gray-200">
        <img 
          src={car.image} 
          alt={`${car.make} ${car.model}`} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-amber-500 text-white px-2 py-1 rounded-md text-sm font-medium">
          {car.pricePerDay}€/zi
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800">{car.make} {car.model}</h3>
        <div className="mt-2 text-gray-600 space-y-1">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {car.horsepower} CP
          </div>
        </div> 
      </div>
    </div>

    {/* Buton Detalii */}
    <div className="p-4 pt-0">
      <Link
        to={`/cars/${car._id}`}
        className="inline-block w-full bg-amber-500 hover:bg-amber-600 text-white text-center py-2 rounded-md text-sm transition"
      >
        Vezi detalii
      </Link>
    </div>
  </div>
);

export default CarCard;
