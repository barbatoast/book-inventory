import { useState } from "react";
import { FaStar } from "react-icons/fa";
import "./BookRating.css";

interface BookRatingProps {
  rating: number;
  isbn: string;
  onRateBook: (isbn: string, rating: number) => void;
}

const BookRating = ({ rating, isbn, onRateBook }: BookRatingProps) => {
  const [hover, setHover] = useState<null | number>(null);
  return (
    <div className="flex justify-center items-center">
      {[...Array(5)].map((_, index) => {
        const currentRating = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              className="book-radio"
              value={rating}
              onClick={() => onRateBook(isbn, currentRating)}
            />
            <FaStar
              className="book-star"
              size={24}
              color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(null)}
            ></FaStar>
          </label>
        );
      })}
    </div>
  );
};

export default BookRating;
