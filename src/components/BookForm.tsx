import React, { useState } from 'react';
import axios from 'axios';
import { Book } from '../models/book';

interface BookFormProps {
  onAddBook: (book: Book) => void;
}

export const BookForm = ({ onAddBook }: BookFormProps) => {
  const [isbn, setIsbn] = useState('');
  const isValidISBN = (isbn: string) => /^[0-9]{10,13}$/.test(isbn);

  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidISBN(isbn)) {
      return alert('Please enter a valid ISBN.');
    }
    try {
      const response = await axios.get(
        `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`);
      const bookData = response.data[`ISBN:${isbn}`];
      const book: Book = {
        isbn,
        title: bookData.title,
        author: bookData.authors[0].name,
        cover: bookData.cover ? bookData.cover.medium : 'No_Cover.jpg',
        rating: 0,
      };
      onAddBook(book);
      setIsbn('');
    } catch (error) {
      console.error('Error fetching book data:', error);
    }
  };

  return (
    <form onSubmit={handleAddBook}>
      <input
        type="text"
        value={isbn}
        onChange={(e) => setIsbn(e.target.value)}
        placeholder="Enter ISBN"
        required
      />
      <button type="submit">Add Book</button>
    </form>
  );
};

export default BookForm;
