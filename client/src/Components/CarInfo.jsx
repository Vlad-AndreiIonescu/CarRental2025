const CarInfo = () => {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Tesla Model 3</h2>
        <ul className="text-gray-700 space-y-2">
          <li><strong>Year:</strong> 2022</li>
          <li><strong>Mileage:</strong> 15,000 km</li>
          <li><strong>Transmission:</strong> Automatic</li>
          <li><strong>Fuel Type:</strong> Electric</li>
          <li><strong>Horsepower:</strong> 450 HP</li>
          <li><strong>Price/Day:</strong> <span className="text-green-600 font-semibold">$100</span></li>
        </ul>
      </div>
    );
  };
  
  export default CarInfo;
  