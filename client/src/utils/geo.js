export const toRadians = (deg) => (deg * Math.PI) / 180;

export const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
    Math.cos(toRadians(lat2)) *
    Math.sin(dLng / 2) ** 2;

  return 6371 * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))); // km
};
