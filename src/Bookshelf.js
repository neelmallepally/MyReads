import Book from "./Book.js"

function Bookshelf({title, books, onBookShelfChange }) {
   
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map((book) => {
                        return (
                            <li key={book.id}>
                                <Book book={book} onUpdateShelf={onBookShelfChange} />
                            </li>
                        );
                    })}                   
                </ol>
            </div>
        </div>
    );
}

export default Bookshelf;