import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Bookshelf from "./Bookshelf";
import { search } from "./BooksAPI";

function Search({ myBooks, addOrUpdateBookShelf }) {

    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (query.trim() === '') {
            setResults([]);
            return;
        }

        const fetchResults = async () => {
            const books = await search(query, 100);
            const updatedBooks = (Array.isArray(books) ? books : []).map((book) => {
                const matchingBook = myBooks.find(b => b.id === book.id);
                return {
                    ...book,
                    shelf: matchingBook ? matchingBook.shelf : "none"
                };
            });

            setResults(updatedBooks);
        };

        fetchResults();

    }, [query, myBooks]);

    const addBookToShelf = (book, newShelf) => {
        setResults((prevBooks) => {
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

        addOrUpdateBookShelf(book, newShelf);

      };

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link className="close-search" to="/">
                    Close
                </Link>
                <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search by title, author, or ISBN"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
            </div>
            <div className="search-books-results">
                {results ? <Bookshelf title="Search Results" books={results} onBookShelfChange={addBookToShelf}  ></Bookshelf> : <h4>No books found.</h4>}

            </div>
        </div>
    );
}

export default Search;