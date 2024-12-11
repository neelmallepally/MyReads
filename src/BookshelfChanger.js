import { useState } from "react";
function BookshelfChanger({ book }) {

    const isCurrentlyReading = book.shelf === "currentlyReading";
    const isWantToRead = book.shelf === "wantToRead";
    const isRead = book.shelf === "read";
    const isNone = (!isCurrentlyReading && !isWantToRead && !isRead);

    const [selectedShelf, setSelectedShelf] = useState(book.shelf);

    const handleShelfChange = (event) => {
        setSelectedShelf(event.target.value);
    };

    return (
        <div className="book-shelf-changer">
            <select value={selectedShelf} onChange={handleShelfChange}>
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
    );
}

export default BookshelfChanger;