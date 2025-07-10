export const submitReview = async (carId, newReview) => {
  const response = await fetch(`https://carrental2025.onrender.com/api/cars/${carId}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newReview),
  });

  if (!response.ok) {
    throw new Error("Failed to add review");
  }

  const updatedCar = await response.json();
  return updatedCar.reviews || [];
};
