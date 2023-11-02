import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
// import DeleteBook from "./DeleteBook";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    const response = await axios.get("http://localhost:2000/books");
    setBooks(response.data);
  };

  return (
    <div>
      <h1 className="title">Books</h1>
      <h2 className="subtitle">List of Books</h2>
      {user && user.role !== "anggota" && (
        <Link to="/books/add" className="button is-primary mb-2">
          Add New
        </Link>
      )}
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>Book Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={book.id}>
              <td>{index + 1}</td>
              <td className="">{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publisher}</td>
              <td>{book.book_status}</td>
              <td>
                <div>
                  <Link
                    to={`/books/detail/${book.id}`}
                    className="button is-small is-info mr-1"
                  >
                    Detail
                  </Link>
                  {user && user.role !== "anggota" && (
                    <>
                      <Link
                        to={`/books/edit/${book.id}`}
                        className="button is-small is-warning mr-1"
                      >
                        Edit
                      </Link>
                      <Link
                        to={`/books/delete/${book.id}`}
                        className="button is-small is-danger"
                      >
                        Delete
                      </Link>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;
