import axios from 'axios';

export const fetchBookDetails = async (isbn: string) => {
  const response = await axios.get(
    `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`);
  return response.data[`ISBN:${isbn}`];
};
