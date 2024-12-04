import BookshelfChanger from "./BookshelfChanger.js"

function Book({ book }) {
    return (
        <div className="book">
            <div className="book-top">
                <div
                    className="book-cover"
                    style={{
                        width: 128,
                        height: 193,
                        backgroundImage:
                            `url(${book.imageLinks.thumbnail})`,
                    }}
                ></div>
                <BookshelfChanger />
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors.join(", ")}</div>
        </div>
    );
}

export default Book;