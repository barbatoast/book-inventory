import { useState } from "react";
import { Book } from "../types/book";
import Rating from "react-rating";
import "font-awesome/css/font-awesome.min.css";
import { Button } from "./ui/button";

interface BookItemProps {
  book: Book;
  onDeleteBook: (isbn: string) => void;
  onRateBook: (isbn: string, rating: number) => void;
}

export const BookItem = ({ book, onDeleteBook, onRateBook }: BookItemProps) => {
  const [loaded, setLoaded] = useState(false);

  const handleRatingChange = (newRating: number) => {
    onRateBook(book.isbn, newRating);
  };

  return (
    <div className="bg-card text-card-foreground p-4 rounded-lg shadow-md mb-4 mt-8">
      {loaded ? null : <div className="book-image bg-red-500 w-full h-64" />}
      <div className="text-center">
        <h4 className="text-2xl font-semibold mb-2">{book.title}</h4>
        <h3 className="text-xl mb-4">Author: {book.author}</h3>
        <p className="text-lg mb-2">ISBN: {book.isbn}</p>
      </div>
      <img
        className={`book-image mx-auto mb-4 w-[200px] ${loaded ? "" : "hidden"}`}
        onLoad={() => setLoaded(true)}
        src={book.cover}
        alt={book.title}
      />
      <div className="text-center mb-4">
        <Rating
          className="book-rating"
          initialRating={book.rating}
          emptySymbol="fa fa-star-o fa-2x"
          fullSymbol="fa fa-star fa-2x"
          onChange={(rate) => handleRatingChange(rate)}
        />
      </div>
      <div className="text-center">
        <Button variant="destructive" onClick={() => onDeleteBook(book.isbn)}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default BookItem;
