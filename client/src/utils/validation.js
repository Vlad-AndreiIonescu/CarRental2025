export const validateLoginForm = ({ email, password }) => {
  if (!email || !password) {
    return "Ambele câmpuri sunt obligatorii!";
  }
  return null;
};


export const validateRentalForm = (pickup, dropoff, pickupLocation, returnLocation) => {
  if (!pickup || !dropoff || !pickupLocation || !returnLocation) {
    return 'Toate câmpurile sunt obligatorii';
  }

  const pickupDate = new Date(pickup);
  const returnDate = new Date(dropoff);
  const now = new Date();

  if (pickupDate < now)
    return 'Data de preluare nu poate fi în trecut';

  if (returnDate <= pickupDate)
    return 'Data de returnare trebuie să fie după preluare';

  const diffHours = (returnDate - pickupDate) / (1000 * 60 * 60);
  if (diffHours < 12)
    return 'Închirierea trebuie să fie de minim 12 ore';

  return null;
};


export const validateReview = (rating, comment) => {
  if (!rating) {
    return "Please select a rating!";
  }
  if (!comment.trim()) {
    return "Please write a review!";
  }
  return null; // valid!
};