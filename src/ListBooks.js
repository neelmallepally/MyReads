import { Link } from "react-router-dom";
import AppTitle from "./AppTitle.js";
import Bookshelf from "./Bookshelf.js";
import { useState, useEffect } from "react";

function ListBooks({ books, onBookShelfChange }) {

  const [currentBooks, setCurrentBooks] = useState([]);

  useEffect(() => {
    setCurrentBooks(books);
  }, [books]);

  const currently = books.filter((book) => book.shelf === "currentlyReading");
  const wantTo = books.filter((book) => book.shelf === "wantToRead");
  const read = books.filter((book) => book.shelf === "read");

  return (
    <div className="list-books">
      <AppTitle />
      <div className="list-books-content">
        <div>
          <Bookshelf title="Currently Reading" books={currently} onBookShelfChange={onBookShelfChange} />
          <Bookshelf title="Want to Read" books={wantTo} onBookShelfChange={onBookShelfChange}/>
          <Bookshelf title="Read" books={read} onBookShelfChange={onBookShelfChange} />
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
}

export default ListBooks;