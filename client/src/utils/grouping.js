export const groupCarsByLocation = (cars) => {
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
