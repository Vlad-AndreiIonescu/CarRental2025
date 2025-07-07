const CarImage = ({ image, make, model }) => {
  const handleImageError = (e) => {
    e.target.src = "/default-car.png";
  };
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden max-h-[450px]">
      <img
        src={image || "/default-car.png"}
        alt={`${make} ${model}`}
        className="w-full h-[400px] object-cover object-center"
        onError={handleImageError}
      />
    </div>
  );
};

export default CarImage;
