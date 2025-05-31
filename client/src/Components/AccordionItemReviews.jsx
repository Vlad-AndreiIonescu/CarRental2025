import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import StarRating from "./StarRating";

const AccordionItemReviews = ({ reviews, onAddReview }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating || !comment.trim()) return;

    const newReview = {
      id: Date.now(),
      rating,
      comment,
    };

    onAddReview(newReview);
    setRating(0);
    setComment("");
  };

  return (
    <div className="border rounded overflow-hidden">
      <button
        className="flex justify-between items-center w-full p-4 text-left font-semibold"
        onClick={() => setIsOpen(!isOpen)}
      >
        Customer Reviews
        <FaChevronDown
          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="p-4 border-t space-y-6">
          {/* Afișăm review-urile existente */}
          {reviews.length === 0 ? (
            <p className="text-gray-600">No reviews yet. Be the first to leave one!</p>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="p-3 border rounded-md">
                <StarRating rating={review.rating} />
                <p className="text-gray-700 mt-2">{review.comment}</p>
              </div>
            ))
          )}

          {/* Form pentru review nou */}
          <form onSubmit={handleSubmit} className="space-y-4 pt-4 border-t">
            <div>
              <label className="block text-gray-700 mb-1 font-semibold">Add Your Review</label>
              <StarRating rating={rating} setRating={setRating} />
            </div>
            <textarea
              className="w-full p-2 border rounded"
              placeholder="Write your review..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Submit Review
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AccordionItemReviews;
