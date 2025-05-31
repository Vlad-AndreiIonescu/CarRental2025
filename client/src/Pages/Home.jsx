import { useEffect, useState, lazy, Suspense } from "react";
import axios from "axios";
import CarCard from "../Components/CarCard";
import SearchFilters from "../Components/SearchFilters";
import Navbar from "../Components/Navbar";

// Lazy load the CarsMap component
const CarsMap = lazy(() => import('../Components/CarsMap'));
const CARS_PER_PAGE = 16;

const Home = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    brand: [],
    carType: [],
    fuelType: [],
    transmission: [],
    year: "",
    priceRange: [0, 1000],
    horsepowerRange: "",
    features: {},
    search: ""
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/cars");
        setCars(response.data.map(car => ({
          ...car,
          // Asigură-te că fiecare mașină are locație
          location: car.location || {
            lat: 44.4268 + (Math.random() * 0.02 - 0.01),
            lng: 26.1025 + (Math.random() * 0.02 - 0.01)
          }
        })));
      } catch (err) {
        console.error("Error fetching cars:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  const featuresMap = {
    "Navigație": "hasGPS",
    "Scaune încălzite": "hasHeatedSeats",
    "Bluetooth": "hasBluetooth",
    "Senzori parcare": "hasParkingSensors",
    "Climatronic": "hasClimateControl",
    "Camera spate": "hasRearCamera"
  };

  const filteredCars = cars.filter((car) => {
    const matchesSearch = !filters.search ||
      car.make.toLowerCase().includes(filters.search.toLowerCase()) ||
      car.model.toLowerCase().includes(filters.search.toLowerCase());

    const matchesBrand = filters.brand.length === 0 || filters.brand.includes(car.make);
    const matchesType = filters.carType.length === 0 || filters.carType.includes(car.type);
    const matchesFuel = filters.fuelType.length === 0 || filters.fuelType.includes(car.fuelType);
    const matchesTransmission = filters.transmission.length === 0 || filters.transmission.includes(car.transmission);
    const matchesYear = !filters.year || car.year === Number(filters.year);
    const matchesPrice = car.pricePerDay >= filters.priceRange[0] && car.pricePerDay <= filters.priceRange[1];

    const matchesHorsepower = (() => {
      if (!filters.horsepowerRange) return true;
      const hp = car.horsepower || 0;
      switch (filters.horsepowerRange) {
        case "<100": return hp < 100;
        case "100-200": return hp >= 100 && hp <= 200;
        case "201-300": return hp > 200 && hp <= 300;
        case ">300": return hp > 300;
        default: return true;
      }
    })();

    const matchesFeatures = Object.keys(filters.features).length === 0 ||
      Object.entries(filters.features).every(([uiFeature, isSelected]) =>
        !isSelected || car[featuresMap[uiFeature]] === true
      );

    return (
      matchesSearch &&
      matchesBrand &&
      matchesType &&
      matchesFuel &&
      matchesTransmission &&
      matchesYear &&
      matchesPrice &&
      matchesHorsepower &&
      matchesFeatures
    );
  });

  // Grupează mașinile după locație
  const groupCarsByLocation = (cars) => {
    const groups = {};
    cars.forEach(car => {
      const key = `${car.location.lat.toFixed(4)}_${car.location.lng.toFixed(4)}`;
      if (!groups[key]) {
        groups[key] = {
          location: car.location,
          cars: []
        };
      }
      groups[key].cars.push(car);
    });
    return Object.values(groups);
  };

  const locationGroups = groupCarsByLocation(filteredCars);

  // Pagination logic
  const totalPages = Math.ceil(filteredCars.length / CARS_PER_PAGE);
  const paginatedCars = filteredCars.slice(
    (currentPage - 1) * CARS_PER_PAGE,
    currentPage * CARS_PER_PAGE
  );

  const goToPrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPage = (page) => setCurrentPage(Math.max(1, Math.min(page, totalPages)));

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex flex-col lg:flex-row pt-4 gap-4">
        {/* Filters Sidebar */}
        <div className="w-full lg:w-72 xl:w-80 bg-white shadow-lg border border-gray-200 p-4 rounded-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filtre
          </h2>
          <SearchFilters filters={filters} setFilters={setFilters} />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
            </div>
          ) : (
            <>
              <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  {filteredCars.length} mașini disponibile
                </h2>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setShowMap(!showMap)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border ${showMap ? 'bg-amber-500 text-white border-amber-500' : 'bg-white border-gray-300 hover:bg-gray-50'}`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    {showMap ? 'Afișează lista' : 'Afișează pe hartă'}
                  </button>
                  <div className="relative w-full sm:w-auto">
                    <input
                      type="text"
                      placeholder="Caută mașini..."
                      className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                      value={filters.search}
                      onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                    />
                    <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              {filteredCars.length > 0 ? (
                <>
                  {showMap ? (
                    <div className="sticky top-20 h-[calc(100vh-5rem)] z-0">
                      <Suspense fallback={<div className="h-full flex items-center justify-center">Se încarcă harta...</div>}>
                        <div className="h-full rounded-lg overflow-hidden shadow-lg border border-gray-200">
                          <CarsMap locationGroups={locationGroups} />
                        </div>
                      </Suspense>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                        {paginatedCars.map((car) => (
                          <CarCard key={car._id} car={car} />
                        ))}
                      </div>

                      {/* Pagination */}
                      <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="text-sm text-gray-600">
                          Afișez mașinile {Math.min((currentPage - 1) * CARS_PER_PAGE + 1, filteredCars.length)}-
                          {Math.min(currentPage * CARS_PER_PAGE, filteredCars.length)} din {filteredCars.length}
                        </div>

                        <div className="flex items-center gap-2 flex-wrap">
                          <button
                            onClick={goToPrevPage}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            Înapoi
                          </button>

                          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            let pageNum;
                            if (totalPages <= 5) {
                              pageNum = i + 1;
                            } else if (currentPage <= 3) {
                              pageNum = i + 1;
                            } else if (currentPage >= totalPages - 2) {
                              pageNum = totalPages - 4 + i;
                            } else {
                              pageNum = currentPage - 2 + i;
                            }

                            return (
                              <button
                                key={pageNum}
                                onClick={() => goToPage(pageNum)}
                                className={`w-10 h-10 rounded-md ${currentPage === pageNum ? 'bg-amber-500 text-white' : 'bg-white border border-gray-300 hover:bg-gray-50'} transition-colors`}
                              >
                                {pageNum}
                              </button>
                            );
                          })}

                          <button
                            onClick={goToNextPage}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            Înainte
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="mt-2 text-lg font-medium text-gray-900">Niciun rezultat</h3>
                  <p className="mt-1 text-gray-500">Încercați să modificați filtrele pentru a găsi mașini.</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;