import { useState } from "react";

const StarRating = ({ rating, onRatingChange }) => {
  const [hoveredRating, setHoveredRating] = useState(0);

  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onMouseEnter={() => setHoveredRating(star)}
          onMouseLeave={() => setHoveredRating(0)}
          onClick={() => onRatingChange && onRatingChange(star)}
          className="focus:outline-none"
        >
          <span className={`text-2xl ${
            (hoveredRating || rating) >= star 
              ? "text-yellow-400" 
              : "text-gray-300"
          }`}>
            ★
          </span>
        </button>
      ))}
    </div>
  );
};

export default StarRating;