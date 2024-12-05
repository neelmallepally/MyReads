import { Link } from "react-router-dom";
import AppTitle from "./AppTitle.js"
import Bookshelf from "./Bookshelf.js"

function ListBooks({currentlyReading, wantToRead, readBooks}){
    return(
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
            <Link to="/search">Add a book</Link>
          </div>
        </div>
    );
}

export default ListBooks;