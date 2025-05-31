const StarRating = ({ rating, onRatingChange }) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange && onRatingChange(star)}
          >
            <span className={star <= rating ? "text-yellow-400 text-2xl" : "text-gray-300 text-2xl"}>
              ⭐
            </span>
          </button>
        ))}
      </div>
    );
  };
  
  export default StarRating;
  