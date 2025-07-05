export const filterCars = (cars, filters, featuresMap) => {
  return cars.filter((car) => {
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
};
