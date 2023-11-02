import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const FormAddBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [publication, setPublication] = useState("");
  const [description, setDescription] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveProduct = async (e) => {
    e.preventDefault();

    if (!title || !author || !publisher || !publication || !description) {
      setMsg("Semua Kolom Harus diisi")
      return;
    }

    try {
      await axios.post("http://localhost:2000/books", {
        title: title,
        author: author,
        publisher: publisher,
        publication_year: publication,
        description: description,
      });
      navigate("/books");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className="title">Books</h1>
      <h2 className="subtitle">Add New Book</h2>
      <Link to="/books" className="button is-danger mb-2">
        Cancel
      </Link>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={saveProduct}>
              <p className="has-text-centered has-text-danger">{msg}</p>
              <div className="field">
                <label className="label">Title</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Book Title"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Author</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Author"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Publisher</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={publisher}
                    onChange={(e) => setPublisher(e.target.value)}
                    placeholder="Publisher"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Publication Year</label>
                <div className="control">
                  <input
                    type="date"
                    className="input"
                    value={publication}
                    onChange={(e) => setPublication(e.target.value)}
                    placeholder="Publication"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Description</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                  />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <button
                    type="submit"
                    className="button is-success is-fullwidth"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAddBook;
