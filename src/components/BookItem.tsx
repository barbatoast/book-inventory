import { useState } from "react";
import { Book } from "../types/book";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import BookRating from "./BookRating";

interface BookItemProps {
  book: Book;
  onDeleteBook: (isbn: string) => void;
  onRateBook: (isbn: string, rating: number) => void;
}

export const BookItem = ({ book, onDeleteBook, onRateBook }: BookItemProps) => {
  const [loaded, setLoaded] = useState<boolean>(false);

  return (
    <div className="bg-card text-card-foreground p-4 rounded-lg shadow-md mb-4 mt-8 max-w-md mx-auto">
      {!loaded && (
        <div>
          <Skeleton className="h-10 w-3/4 mx-auto mb-2" />
          <Skeleton className="h-8 w-1/2 mx-auto mb-4" />
          <Skeleton className="h-6 w-1/2 mx-auto mb-2" />
          <Skeleton className="w-[200px] h-[300px] mx-auto mb-4" />
          <Skeleton className="h-8 w-1/2 mx-auto mb-2" />
          <Skeleton className="h-12 w-1/4 mx-auto" />
        </div>
      )}
      <div className={`${loaded ? "" : "hidden"}`}>
        <div className="text-center">
          <h4 className="text-2xl font-semibold mb-2">{book.title}</h4>
          <h3 className="text-xl mb-4">Author: {book.author}</h3>
          <p className="text-lg mb-2">ISBN: {book.isbn}</p>
        </div>
        <img
          className="book-image mx-auto mb-4 w-[200px]"
          onLoad={() => setLoaded(true)}
          src={book.cover}
          alt={book.title}
        />
        <div className="text-center mb-4">
          <BookRating
            rating={book.rating}
            isbn={book.isbn}
            onRateBook={onRateBook}
          />
        </div>
        <div className="text-center">
          <Button variant="destructive" onClick={() => onDeleteBook(book.isbn)}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookItem;
