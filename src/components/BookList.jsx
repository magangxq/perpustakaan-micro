import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { IoSearch } from "react-icons/io5";

const BookList = () => {
  const [books, setBooks] = useState([]);
  // const [imageSrc, setImageSrc] = useState(null);
  const [filterBook, setFilterBook] = useState("");
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    getBooks();
    // getCover();
  }, []);

  const getBooks = async () => {
    const response = await axios.get("http://localhost:2000/books");
    setBooks(response.data);
  };

  // const getCover = async () => {
  //   axios.get("http://localhost:2000/books")
  //     .then(response => {
  //       if (response.data && response.data.cover) {
  //         const blob = new Blob([response.data.cover], {type: 'image/jpeg'});
  //         const imageUrl = URL.createObjectURL(blob);
  //         setImageSrc(imageUrl)
  //       } else {
  //         console.error('Data cover tidak ditemukan dalam response.')
  //       } 
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //     })

  // }

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(filterBook.toLowerCase())
  );

  return (
    <div>
      <h1 className="title">Books</h1>
      <h2 className="subtitle">List of Books</h2>
      <div className="is-flex is-justify-content-space-between">
        {user && user.role !== "anggota" && (
          <div className="mb-2">
            <Link to="/books/add" className="button is-primary">
              Add New
            </Link>
          </div>
        )}

        <div className="is-flex is-align-items-center mb-2 mr-5">
          <div className="panel-block">
            <p className="control has-icons-left">
              <input
                className="input" 
                type="search" 
                placeholder="Filter by Title"
                value={filterBook}
                onChange={(e) => setFilterBook(e.target.value)} 
                />
              <span className="icon is-left">
              <IoSearch/>
              </span>
            </p>
          </div>
        </div>
      </div>

      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Cover</th>
            <th>Title</th>
            <th>Author</th>
            {/* <th>Publisher</th> */}
            <th>Book Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((book, index) => (
            <tr key={book.id}>
              <td>{index + 1}</td>
              <td><img src={book.cover} style={{ width: '100px', height: '100px' }} alt="Cover Book" /></td>
              {/* <td>{imageSrc && <img src={imageSrc} alt="Cover"/>}</td> */}
              <td>{book.title}</td>
              <td>{book.author}</td>
              {/* <td>{book.publisher}</td> */}
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
