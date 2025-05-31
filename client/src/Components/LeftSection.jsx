import CarImage from "./CarImage";
import CarDetailsAccordion from "./CarDetailsAccordion";

const LeftSection = ({ car, reviews, handleAddReview }) => {
    return (
      <div className="flex flex-col space-y-6 h-full">
        <CarImage image={car.image} make={car.make} model={car.model} />

        <CarDetailsAccordion car={car} reviews={reviews} handleAddReview={handleAddReview} />
      </div>
    );
  };
  
export default LeftSection;
  
