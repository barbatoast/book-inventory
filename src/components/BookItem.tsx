import React from 'react';
import { Book } from '../models/book';

interface BookItemProps {
  book: Book;
  onDeleteBook: (isbn: string) => void;
  onRateBook: (isbn: string, rating: number) => void
}

export const BookItem = ({ book, onDeleteBook, onRateBook }: BookItemProps) => {
  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rating = parseInt(e.target.value, 10);
    onRateBook(book.isbn, rating);
  };

  return (
    <div className="book-item">
      <h3>{book.title}</h3>
      <h4>{book.isbn}</h4>
      <p>{book.author}</p>
      <img src={book.cover} alt={book.title} />
      <input
        type="number"
        className="book-rating"
        value={book.rating}
        onChange={handleRatingChange}
        min="1" max="5"
      />
      <button onClick={() => onDeleteBook(book.isbn)}>Delete</button>
    </div>
  );
};

export default BookItem;
