import { useState } from "react";

const SearchFilters = ({ filters, setFilters }) => {
  const brands = ['BMW', 'Mercedes', 'Dacia', 'Toyota', 'Audi', 'Volkswagen', 'Ford', 'Renault'];
  const carTypes = ['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Convertible', 'Pickup'];
  const fuelTypes = ['Benzină', 'Diesel', 'Electric', 'Hybrid'];
  const transmissions = ['Manuală', 'Automatic'];
  const horsepowerRanges = ['<100', '100-200', '201-300', '>300'];
  const featuresList = ['Navigație', 'Scaune încălzite', 'Bluetooth', 'Senzori parcare'];
  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);

  const toggleCheckboxFilter = (category, value) => {
    const prevValues = filters[category];
    const updatedValues = prevValues.includes(value)
      ? prevValues.filter(item => item !== value)
      : [...prevValues, value];

    setFilters({ ...filters, [category]: updatedValues });
  };

  const toggleFeature = (feature) => {
    setFilters({
      ...filters,
      features: {
        ...filters.features,
        [feature]: !filters.features[feature],
      },
    });
  };

  return (
    <div className="space-y-6 text-sm">
      {/* Brand */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Brand</h3>
        <div className="space-y-2">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center">
              <input
                type="checkbox"
                id={`brand-${brand}`}
                checked={filters.brand.includes(brand)}
                onChange={() => toggleCheckboxFilter("brand", brand)}
                className="h-4 w-4 text-amber-500 border-gray-300"
              />
              <label htmlFor={`brand-${brand}`} className="ml-2 text-gray-700">{brand}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Car Type */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Tip caroserie</h3>
        <div className="grid grid-cols-2 gap-2">
          {carTypes.map((type) => (
            <div key={type} className="flex items-center">
              <input
                type="checkbox"
                id={`type-${type}`}
                checked={filters.carType.includes(type)}
                onChange={() => toggleCheckboxFilter("carType", type)}
                className="h-4 w-4 text-amber-500 border-gray-300"
              />
              <label htmlFor={`type-${type}`} className="ml-2 text-gray-700">{type}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Fuel Type */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Combustibil</h3>
        <div className="grid grid-cols-2 gap-2">
          {fuelTypes.map((fuel) => (
            <div key={fuel} className="flex items-center">
              <input
                type="checkbox"
                id={`fuel-${fuel}`}
                checked={filters.fuelType.includes(fuel)}
                onChange={() => toggleCheckboxFilter("fuelType", fuel)}
                className="h-4 w-4 text-amber-500 border-gray-300"
              />
              <label htmlFor={`fuel-${fuel}`} className="ml-2 text-gray-700">{fuel}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Transmission */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Transmisie</h3>
        <div className="grid grid-cols-2 gap-2">
          {transmissions.map((trans) => (
            <div key={trans} className="flex items-center">
              <input
                type="checkbox"
                id={`trans-${trans}`}
                checked={filters.transmission.includes(trans)}
                onChange={() => toggleCheckboxFilter("transmission", trans)}
                className="h-4 w-4 text-amber-500 border-gray-300"
              />
              <label htmlFor={`trans-${trans}`} className="ml-2 text-gray-700">{trans}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Horsepower */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Cai putere</h3>
        <div className="grid grid-cols-2 gap-2">
          {horsepowerRanges.map((hp) => (
            <div key={hp} className="flex items-center">
              <input
                type="radio"
                id={`hp-${hp}`}
                name="horsepower"
                checked={filters.horsepowerRange === hp}
                onChange={() => setFilters({ ...filters, horsepowerRange: hp })}
                className="h-4 w-4 text-amber-500 border-gray-300"
              />
              <label htmlFor={`hp-${hp}`} className="ml-2 text-gray-700">{hp}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Year */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">An fabricație</h3>
        <select
          value={filters.year}
          onChange={(e) => setFilters({ ...filters, year: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Toți anii</option>
          {years.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      {/* Features */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Dotări</h3>
        <div className="grid grid-cols-2 gap-2">
          {featuresList.map((feature) => (
            <div key={feature} className="flex items-center">
              <input
                type="checkbox"
                id={`feature-${feature}`}
                checked={filters.features[feature] || false}
                onChange={() => toggleFeature(feature)}
                className="h-4 w-4 text-amber-500 border-gray-300"
              />
              <label htmlFor={`feature-${feature}`} className="ml-2 text-gray-700">{feature}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
