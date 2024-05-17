import { Book } from '../models/book';
import Rating from 'react-rating';
import 'font-awesome/css/font-awesome.min.css';

interface BookItemProps {
  book: Book;
  onDeleteBook: (isbn: string) => void;
  onRateBook: (isbn: string, rating: number) => void
}

export const BookItem = ({ book, onDeleteBook, onRateBook }: BookItemProps) => {
  const handleRatingChange = (newRating: number) => {
    onRateBook(book.isbn, newRating);
  };

  return (
    <div className="book-item">
      <h3>{book.title}</h3>
      <h4>{book.isbn}</h4>
      <p>{book.author}</p>
      <img src={book.cover} alt={book.title} />
      <Rating
        className='book-rating'
        initialRating={book.rating}
        emptySymbol="fa fa-star-o fa-2x"
        fullSymbol="fa fa-star fa-2x"
        onChange={(rate) => handleRatingChange(rate)}
      />
      <button onClick={() => onDeleteBook(book.isbn)}>Delete</button>
    </div>
  );
};

export default BookItem;
