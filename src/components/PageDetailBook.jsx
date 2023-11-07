import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const FormEditBook = () => {
    const [code, setCode] = useState("");
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [publisher, setPublisher] = useState("");
    const [publication, setPublication] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");
    const [msg, setMsg] = useState("");
    const { id } = useParams();

    useEffect(() => {
        const getBookById = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:2000/books/${id}`
                );
                setCode(response.data.code);
                setTitle(response.data.title);
                setAuthor(response.data.author);
                setPublisher(response.data.publisher);
                setPublication(response.data.publication_year);
                setDescription(response.data.description);
                setStatus(response.data.book_status);
            } catch (error) {
                if (error.response) {
                    setMsg(error.response.data.msg);
                }
            }
        };
        getBookById();
    }, [id]);


    return (
        <div>
            <h1 className="title">Books</h1>
            <h2 className="subtitle">Detail Book <label>{title}</label></h2>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <p className="has-text-centered">{msg}</p>
                        <div className="field">
                            <label className="label">
                                Code: &nbsp;
                                <label className="has-text-weight-semibold">
                                    {code}
                                </label>
                            </label>
                        </div>
                        <div className="field">
                            <label className="label">
                                Title: &nbsp;
                                <label className="has-text-weight-semibold">
                                    {title}
                                </label>
                            </label>
                        </div>
                        <div className="field">
                            <label className="label">
                                Author: &nbsp;
                                <label className="has-text-weight-semibold">
                                    {author}
                                </label>
                            </label>
                        </div>
                        <div className="field">
                            <label className="label">
                                Publisher: &nbsp;
                                <label className="has-text-weight-semibold">
                                    {publisher}
                                </label>
                            </label>
                        </div>
                        <div className="field">
                            <label className="label">
                                Publication Year: &nbsp;
                                <label className="has-text-weight-semibold">
                                    {publication}
                                </label>
                            </label>
                        </div>
                        <div className="field">
                            <label className="label">
                                Description: &nbsp;
                                <label className="has-text-weight-semibold">
                                    {description}
                                </label>
                            </label>
                        </div>
                        <div className="field">
                            <label className="label">
                                Current Status Of The Book: &nbsp;
                                <label className="has-text-weight-semibold">
                                    {status}
                                </label>
                            </label>
                        </div>
                        <div className="field" style={{ marginTop: '30vh' }}>
                            <div className="control">
                                <Link to="/books" className="button is-info is-fullwidth">
                                    Close
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormEditBook;
