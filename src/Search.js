import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Bookshelf from "./Bookshelf";

function Search({search}) {

    const [query, setQuery] =  useState('');
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (query.trim() === ''){
            setResults([]);
            return;
        }

        const fetchResults = async() => {
            const books = await search(query, 100);
            setResults(books);
            console.log(results);
        };

        fetchResults();

    }, [query, search]);

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
            {results ? <Bookshelf title="Search Results" books={results}></Bookshelf> : <h4>No books found.</h4>}
                
            </div>
        </div>
    );
}

export default Search;