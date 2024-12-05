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

  const currentlyReading = books.filter((book) => book.shelf === "currentlyReading");
  const wantToRead = books.filter((book) => book.shelf === "wantToRead");
  const readBooks = books.filter((book) => book.shelf === "read");

  return (
    <div className="app">
      <Routes>
        <Route exact path="/search" element={<Search></Search>}></Route>
        <Route exact path="/" element={
          <ListBooks
            currentlyReading={currentlyReading}
            wantToRead={wantToRead}
            readBooks={readBooks}>
          </ListBooks>
        }></Route>
      </Routes>
    </div>
  );
}

export default App;
