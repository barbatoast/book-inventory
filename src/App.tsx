import { useEffect, useState } from "react";
import { Book } from "./types/book";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";
import { Toaster } from "./components/ui/toaster";

const App = () => {
  const [books, setBooks] = useState<Book[]>(() => {
    const savedBooks = localStorage.getItem("books");
    return savedBooks ? JSON.parse(savedBooks) : [];
  });

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  const handleAddBook = (book: Book): boolean => {
    if (books.some((el) => el.isbn === book.isbn)) {
      return false;
    }
    setBooks((prevBooks) => [...prevBooks, book]);
    return true;
  };

  const handleDeleteBook = (isbn: string) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.isbn !== isbn));
  };

  const handleRateBook = (isbn: string, rating: number) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) => (book.isbn === isbn ? { ...book, rating } : book))
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
      <div className="w-full max-w-md p-4 text-center">
        <h1 className="text-4xl mb-4">Book Inventory Manager</h1>
        <BookForm onAddBook={handleAddBook} />
        <BookList
          books={books}
          onDeleteBook={handleDeleteBook}
          onRateBook={handleRateBook}
        />
        <Toaster />
      </div>
    </div>
  );
};

export default App;
