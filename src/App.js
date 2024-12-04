import './App.css';
import { useState } from "react";
import AppTitle from "./AppTitle.js"
import Bookshelf from "./Bookshelf.js"
import { useEffect } from 'react';
import * as BooksAPI from "./BooksAPI.js"

function App() {

  const [showSearchPage, setShowSearchpage] = useState(false);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = async() => {
      const response = await BooksAPI.getAll();
      setBooks(response);
    };

    getBooks();
  }, []);

  const currentlyReading = books.filter((book) => book.shelf === "currentlyReading");
  const wantToRead =  books.filter((book) => book.shelf === "wantToRead");
  const readBooks = books.filter((book) => book.shelf === "read");

  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <a
              className="close-search"
              onClick={() => setShowSearchpage(!showSearchPage)}
            >
              Close
            </a>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid"></ol>
          </div>
        </div>
      ) : (
        <div className="list-books">
          <AppTitle />
          <div className="list-books-content">
            <div>
              <Bookshelf title="Currently Reading" books={currentlyReading} />
              <Bookshelf title="Want to Read" books={wantToRead} />
              <Bookshelf title="Read" books={readBooks} />
            </div>
          </div>
          <div className="open-search">
            <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
