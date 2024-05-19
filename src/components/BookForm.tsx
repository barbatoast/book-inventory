import React, { useState } from "react";
import axios from "axios";
import { Book } from "../types/book";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

interface BookFormProps {
  onAddBook: (book: Book) => boolean;
}

export const BookForm = ({ onAddBook }: BookFormProps) => {
  const [isbn, setIsbn] = useState<string>("");
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const isValidISBN = (isbn: string) => /^[0-9]{10,13}$/.test(isbn);
  const { toast } = useToast();

  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidISBN(isbn)) {
      return toast({
        variant: "destructive",
        title: "Please enter a valid ISBN.",
      });
    }
    setIsFetching(true);
    try {
      const response = await axios.get(
        `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`
      );
      const bookData = response.data[`ISBN:${isbn}`];
      if (!bookData) {
        setIsFetching(false);
        return toast({
          variant: "destructive",
          description: "Failed to find book.",
        });
      }
      const book: Book = {
        isbn,
        title: bookData.title ? bookData.title : "Untitled",
        author: bookData.authors ? bookData.authors[0].name : "Unknown author",
        cover: bookData.cover ? bookData.cover.medium : "No_Cover.jpg",
        rating: 0,
      };
      const ok = onAddBook(book);
      if (!ok) {
        setIsFetching(false);
        return toast({
          variant: "destructive",
          title: "ISBN already exists",
        });
      }
      setIsbn("");
      setIsFetching(false);
    } catch (error) {
      console.error(error);
      setIsFetching(false);
      return toast({
        variant: "destructive",
        title: "Error fetching book data",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setIsbn(value);
  };

  return (
    <form onSubmit={handleAddBook}>
      <Input
        type="text"
        value={isbn}
        onChange={handleChange}
        placeholder="Enter ISBN"
        maxLength={17}
        required
      />
      <br />
      <Button type="submit">{isFetching ? "Fetching..." : "Add Book"}</Button>
    </form>
  );
};

export default BookForm;
