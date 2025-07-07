const CarImage = ({ image, make, model }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden max-h-[450px]">
      <img
        src={image || "/default-car.png"}
        alt={`${make} ${model}`}
        className="w-full h-[400px] object-cover object-center"
      />
    </div>
  );
};

export default CarImage;
