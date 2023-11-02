import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

const FormDeleteBook = () => {
    const [title, setTitle] = useState("");
    const [isMutating, setIsMutating] = useState(false);
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getBookById = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:2000/books/${id}`
                );
                setTitle(response.data.title);
            } catch (error) {
                if (error.response) {
                    setMsg(error.response.data.msg);
                }
            }
        };
        getBookById();
    }, [id]);

    const deleteBook = async (bookId) => {
        setIsMutating(true)
        await axios.delete(`http://localhost:2000/books/${id}`)
        setIsMutating(false)

        navigate("/books");
    }

    return (
        <div>
            <h1 className="title">Books</h1>
            <h2 className="subtitle">Are sure to delete <label>{title}</label></h2>

            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                    <p className="has-text-centered has-text-danger">{msg}</p>
                        <div className="has-text-centered">
                            {!isMutating ? (
                                <button onClick={deleteBook} type="submit" className="button is-danger">
                                    Delete
                                </button>
                            ) : (
                                <button type="submit" className="button is-danger">
                                    Deleting...
                                </button>
                            )}
                            <Link to="/books" className="button is-info ml-2">
                                Cancel
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        // <div>
        //     <button className="btn btn-error btn-sm" onClick={handleChange}>
        //         Delete
        //     </button>

        //     <div className="modal">
        //         <div className="modal-box">
        //             <h3 className="font-bold text-lg">
        //                 Are sure to delete {BookList.name} ?
        //             </h3>
        //             <div className="modal-action">
        //                 <button type="button" className="btn" onClick={handleChange}>
        //                     Close
        //                 </button>
        //                 {!isMutating ? (
        //                     <button
        //                         type="button"
        //                         onClick={() => deleteBook(BookList.id)}
        //                         className="btn btn-primary"
        //                     >
        //                         Delete
        //                     </button>
        //                 ) : (
        //                     <button type="button" className="btn loading">
        //                         Deleting...
        //                     </button>
        //                 )}
        //             </div>
        //         </div>
        //     </div>
        // </div>
    )
}

export default FormDeleteBook