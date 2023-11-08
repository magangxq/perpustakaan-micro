import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const FormEditProfile = () => {
    const [uuid, setUuid] = useState("");
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState("");
    const [msg, setMsg] = useState("");
    const [isMutating, setIsMutating] = useState(false);
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        const getUserById = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:2000/user/profile`
                );
                setUuid(response.data.uuid);
                setName(response.data.name);
            } catch (error) {
                if (error.response) {
                    setMsg(error.response.data.msg);
                }
            }
        };
        getUserById();
    }, [uuid]);

    const updateBook = async (e) => {
        e.preventDefault();

        if(!name) {
            setNameError("Name is required")
            return;
        }

        setIsMutating(true)
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
        setIsMutating(false)
    };

    return (
        <div>
            <h1 className="title">Profile</h1>
            <h2 className="subtitle">Edit Profile {user && user.name}</h2>
            <Link to="/profile" className="button is-danger mb-2">
                Cancel
            </Link>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={updateBook}>
                            <p className="has-text-centered has-text-danger">{msg}</p>
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
                                <p className="has-text-centered has-text-danger">{nameError}</p>
                            </div>
                            <div className="field">
                                <div className="control">
                                {!isMutating ? (
                                    <button type="submit" className="button is-success">
                                        Edit
                                    </button>
                                ) : (
                                    <button type="submit" className="button is-success">
                                        Editing...
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

export default FormEditProfile;
