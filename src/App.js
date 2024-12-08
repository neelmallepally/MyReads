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
      console.log("Get books API is called and set books");
    };

    getBooks();
  }, []);

  const updateBooks = (updatedBook, newShelf) => {
    setBooks((prevBooks) => {
      return prevBooks.map((book) =>
        book.id === updatedBook.id ? { ...book, shelf: newShelf } : book
      )
    });
  };

  return (
    <div className="app">
      <Routes>
        <Route exact path="/search" element={<Search></Search>}></Route>
        <Route exact path="/" element={
          <ListBooks books={books} onBookShelfChange={updateBooks}></ListBooks>
        }></Route>
      </Routes>
    </div>
  );
}

export default App;