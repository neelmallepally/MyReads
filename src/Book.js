import { useState } from "react";
import { update } from "./BooksAPI";

function Book({ book, onUpdateShelf }) {

    const isCurrentlyReading = book.shelf === "currentlyReading";
    const isWantToRead = book.shelf === "wantToRead";
    const isRead = book.shelf === "read";
    const isNone = (!isCurrentlyReading && !isWantToRead && !isRead);

    const [selectedShelf, setSelectedShelf] = useState(book.shelf);

    const handleShelfChange = async (newShelf) => {
        const updatedBook = await update(book, newShelf);
        setSelectedShelf(newShelf);
        onUpdateShelf(book, newShelf);
    };

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
                <div className="book-shelf-changer">
                    <select value={selectedShelf} onChange={(e) => handleShelfChange(e.target.value)}>
                        <option value="none" disabled>
                            Move to...
                        </option>
                        <option value="currentlyReading" disabled={isCurrentlyReading}>
                            {isCurrentlyReading ? "✓ Currently Reading" : "Currently Reading"}
                        </option>
                        <option value="wantToRead" disabled={isWantToRead}>
                            {isWantToRead ? "✓ Want to Read" : "Want to Read"}
                        </option>
                        <option value="read" disabled={isRead}>
                            {isRead ? "✓ Read" : "Read"}
                        </option>
                        <option value="none" disabled={isNone}>
                            {isNone ? "✓ None" : "None"}
                        </option>
                    </select>
                </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors.join(", ")}</div>
        </div>
    );
}

export default Book;