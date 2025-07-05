import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import StarRating from "./StarRating";
import { toast } from "react-toastify";
import { validateReview } from "../utils/validation";

const AccordionItemReviews = ({ reviews, onAddReview }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = validateReview(rating, comment);
    if (error) {
      toast.error(error);
      return;
    }

    onAddReview({
      rating,
      comment,
      date: new Date().toISOString(),
    });
    setRating(0);
    setComment("");
  };

  return (
    <div className="border rounded overflow-hidden">
      <button
        className="flex justify-between items-center w-full p-4 text-left font-semibold hover:bg-gray-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        Review-uri ({reviews.length})
        <FaChevronDown
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="p-4 border-t space-y-6">
          {reviews.length === 0 ? (
            <p className="text-gray-600 italic">No reviews yet. Be the first to review!</p>
          ) : (
            <div className="space-y-4">
              {reviews.map((review, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-md">
                  <div className="flex items-center gap-2">
                    <StarRating rating={review.rating} />
                    <span className="text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit} className="pt-4 border-t">
            <h3 className="font-medium text-gray-800 mb-3">Adauga Review-ul tau</h3>

            <div className="mb-3">
              <StarRating 
                rating={rating} 
                onRatingChange={setRating} 
              />
            </div>

            <textarea
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              rows="4"
              placeholder="Impartaseste parerea ta după ce ai folosit aceasta masina..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <button
              type="submit"
              className="mt-3 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-md transition-colors"
            >
              Trimite Review
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AccordionItemReviews;
