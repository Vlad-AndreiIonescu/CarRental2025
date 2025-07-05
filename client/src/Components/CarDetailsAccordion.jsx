import AccordionItem from "./AccordionItem";
import AccordionItemReviews from "./AccordionItemReviews";

const CarDetailsAccordion = ({ car, reviews, handleAddReview}) =>{
  return (
    <div className="space-y-4">
      <AccordionItem title="Informatii Generale">
        <ul className="text-gray-700 space-y-2">
          <li><strong>Marcă:</strong> {car.make}</li>
          <li><strong>Model:</strong> {car.model}</li>
          <li><strong>An:</strong> {car.year}</li>
          <li><strong>Combustibil:</strong> {car.fuelType}</li>
        </ul>
      </AccordionItem>

      <AccordionItem title="Performanta">
        <ul className="text-gray-700 space-y-2">
          <li><strong>Cutie de viteze:</strong> {car.transmission}</li>
          <li><strong>Cai Putere:</strong> {car.horsepower} CP</li>
        </ul>
      </AccordionItem>

      <AccordionItem title="Informatii despre inchiriere">
        <ul className="text-gray-700 space-y-2">
          <li><strong>Pret pe zi:</strong> {car.pricePerDay} €</li>
          <li><strong>Kilometraj:</strong> {car.mileage}</li>
        </ul>
      </AccordionItem>

      {/* AICI introducem reviews */}
      <AccordionItemReviews reviews={reviews || []} onAddReview={handleAddReview} />
    </div>
  );
};

export default CarDetailsAccordion;
