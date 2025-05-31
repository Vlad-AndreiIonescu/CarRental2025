import AccordionItem from "./AccordionItem";
import AccordionItemReviews from "./AccordionItemReviews";

const CarDetailsAccordion = ({ car, reviews, handleAddReview}) =>{
  return (
    <div className="space-y-4">
      <AccordionItem title="General Info">
        <ul className="text-gray-700 space-y-2">
          <li><strong>Make:</strong> {car.make}</li>
          <li><strong>Model:</strong> {car.model}</li>
          <li><strong>Year:</strong> {car.year}</li>
          <li><strong>Fuel Type:</strong> {car.fuelType}</li>
        </ul>
      </AccordionItem>

      <AccordionItem title="Performance">
        <ul className="text-gray-700 space-y-2">
          <li><strong>Transmission:</strong> {car.transmission}</li>
          <li><strong>Horsepower:</strong> {car.horsepower} HP</li>
        </ul>
      </AccordionItem>

      <AccordionItem title="Rental Info">
        <ul className="text-gray-700 space-y-2">
          <li><strong>Price/Day:</strong> ${car.pricePerDay}</li>
          <li><strong>Mileage:</strong> {car.mileage} km</li>
        </ul>
      </AccordionItem>

      {/* AICI introducem reviews */}
      <AccordionItemReviews reviews={reviews || []} onAddReview={handleAddReview} />
    </div>
  );
};

export default CarDetailsAccordion;
