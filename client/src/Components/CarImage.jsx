const CarImage = ({ image, make, model }) => {
    return (
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <img
          src={image || "https://via.placeholder.com/600x400"}
          alt={`${make} ${model}`}
          className="w-full h-[350px] object-contain p-4"
        />
      </div>
    );
  };
  
  export default CarImage;
  