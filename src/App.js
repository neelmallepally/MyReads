import './App.css';
import { useState } from "react";
import { useEffect } from 'react';
import * as BooksAPI from "./BooksAPI.js";
import { Route, Routes } from 'react-router-dom';
import Search from "./Search.js";
import ListBooks from './ListBooks.js';

function App() {

  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      const response = await BooksAPI.getAll();
      setBooks(response);
    };

    getBooks();
  }, []);

  const addOrUpdateBookShelf = (book, newShelf) => {
    setBooks((prevBooks) => {
      // Check if the book is already in the array
      const existingBook = prevBooks.find((b) => b.id === book.id);
  
      if (existingBook) {
        // Update the shelf of the existing book
        return prevBooks.map((b) =>
          b.id === book.id ? { ...b, shelf: newShelf } : b
        );
      } else {
        // Add the new book with the specified shelf
        return [...prevBooks, { ...book, shelf: newShelf }];
      }
    });
  };
  

  return (
    <div className="app">
      <Routes>
        <Route exact path="/search" element={
          <Search myBooks={books} addOrUpdateBookShelf={addOrUpdateBookShelf}></Search>
        }></Route>
        <Route exact path="/" element={
          <ListBooks books={books} onBookShelfChange={addOrUpdateBookShelf}></ListBooks>
        }></Route>
      </Routes>
    </div>
  );
}

export default App;