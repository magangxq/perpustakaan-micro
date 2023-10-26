import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const FormEditProfile = () => {
    const [uuid, setUuid] = useState("");
    const [user, setUser] = useState("");
    const [name, setName] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const getBookById = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:2000/user/profile`
                );
                setUuid(response.data.uuid);
                setUser(response.data.name);
            } catch (error) {
                if (error.response) {
                    setMsg(error.response.data.msg);
                }
            }
        };
        getBookById();
    }, [uuid]);

    const updateBook = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:2000/user/edit-profile/${uuid}`, {
                name: name,
            });
            navigate("/profile");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };

    return (
        <div>
            <h1 className="title">Profile</h1>
            <h2 className="subtitle">Edit Profile {user}</h2>
            <Link to="/profile" className="button is-danger mb-2">
                Cancel
            </Link>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={updateBook}>
                            <p className="has-text-centered">{msg}</p>
                            <div className="field">
                                <label className="label">Name</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Name"
                                        />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <button type="submit" className="button is-success">
                                        Edit
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

export default FormEditProfile;
