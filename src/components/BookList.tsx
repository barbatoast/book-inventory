import { Book } from '../models/book';
import BookItem from './BookItem';

interface BookListProps {
  books: Book[];
  onDeleteBook: (isbn: string) => void;
  onRateBook: (isbn: string, rating: number) => void;
}

const BookList = ({ books, onDeleteBook, onRateBook }: BookListProps) => {
  return (
    <div className='book-list'>
      {books.map((book) => (
        <BookItem
          key={book.isbn}
          book={book}
          onDeleteBook={onDeleteBook}
          onRateBook={onRateBook}
        />
      ))}
    </div>
  );
};

export default BookList;
