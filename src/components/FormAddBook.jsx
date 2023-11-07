import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const FormAddBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [publication, setPublication] = useState("");
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState("");
  const [authorError, setAuthorError] = useState("");
  const [publisherError, setPublisherError] = useState("");
  const [publicationError, setPublicationError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [msg, setMsg] = useState("");
  const [isMutating, setIsMutating] = useState(false);
  const navigate = useNavigate();

  const saveProduct = async (e) => {
    e.preventDefault();

    setTitleError("");
    setAuthorError("");
    setPublisherError("");
    setPublicationError("");
    setDescriptionError("");

    if (!title) {
      setTitleError("Title Harus di isi")
      return;
    }
    if (!author) {
      setAuthorError("Author Harus di isi")
      return;
    }
    if (!publisher) {
      setPublisherError("Publisher Harus di isi")
      return;
    }
    if (!publication) {
      setPublicationError("Publication Year Harus di isi")
      return;
    }
    if (!description) {
      setDescriptionError("Description Harus di isi")
      return;
    }

    setIsMutating(true)

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
    setIsMutating(false)
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
                {titleError && <p className="has-text-centered has-text-danger">{titleError}</p>}
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
                {authorError && <p className="has-text-centered has-text-danger">{authorError}</p>}
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
                {publisherError && <p className="has-text-centered has-text-danger">{publisherError}</p>}
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
                {publicationError && <p className="has-text-centered has-text-danger">{publicationError}</p>}
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
                {descriptionError && <p className="has-text-centered has-text-danger">{descriptionError}</p>}
              </div>

              <div className="field">
                <div className="control">
                {!isMutating ? (
                  <button
                    type="submit"
                    className="button is-success is-fullwidth"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="button is-success is-fullwidth"
                  >
                    Saving...
                  </button>
                )}
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
