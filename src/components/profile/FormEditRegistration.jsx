import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import API from "../../utils/api";

const FormEditRegistration = () => {
    const [uuid, setUuid] = useState("");
    const [name, setName] = useState("");
    const [niknis, setNiknis] = useState("");
    const [email, setEmail] = useState("");
    const [nameError, setNameError] = useState("");
    const [niknisError, setNiknisError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [msg, setMsg] = useState("");
    const [isMutating, setIsMutating] = useState(false);
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        const getUserById = async () => {
            try {
                const response = await axios.get(API.PROFILE_URL);
                setUuid(response.data.uuid);
                setName(response.data.name);
                setNiknis(response.data.nik_nis);
                setEmail(response.data.email);
                // setName(response.data.name);
            } catch (error) {
                if (error.response) {
                    setMsg(error.response.data.msg);
                }
            }
        };
        getUserById();
    }, [uuid]);

    const editProfile = async (e) => {
        e.preventDefault();

        if (!name) {
            setNameError("Name is required")
            return;
        }
        if (!email) {
            setEmailError("Email is required")
            return;
        }
        if (!niknis) {
            setNiknisError("NIK/NIS is required")
            return;
        }

        setIsMutating(true)
        try {
            await axios.patch(`${API.EDIT_REGISTRATION_URL}${uuid}`, {
                name: name,
                email: email,
                nik_nis: niknis,
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
            <h1 className="title">Registration</h1>
            <h2 className="subtitle">Edit Registration {user && user.name}</h2>
            <Link to="/profile" className="button is-danger mb-2">
                Cancel
            </Link>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={editProfile}>
                            {user && user.information === "Name is wrong" &&(
                                <>
                                <p className="has-text-centered has-text-danger">{msg}</p>
                                <div className="field has-text-danger is-flex">
                                    <label className="label has-text-danger">Information: &nbsp;<label className="has-text-weight-semibold">
                                        {user && user.information}
                                    </label></label>
                                </div>
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
                                    <label className="label">Email</label>
                                    <div className="control">
                                        <input
                                            type="text"
                                            className="input"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Email"
                                            disabled
                                        />
                                    </div>
                                    <p className="has-text-centered has-text-danger">{emailError}</p>
                                </div>
                                <div className="field">
                                    <label className="label">NIK/NIS</label>
                                    <div className="control">
                                        <input
                                            type="number"
                                            className="input"
                                            value={niknis}
                                            onChange={(e) => setNiknis(e.target.value)}
                                            placeholder="12345"
                                            disabled
                                        />
                                    </div>
                                    <p className="has-text-centered has-text-danger">{niknisError}</p>
                                </div>
                                </>
                            )}
                            {user && user.information === "Email is wrong" &&(
                                <>
                                <p className="has-text-centered has-text-danger">{msg}</p>
                                <div className="field has-text-danger is-flex">
                                    <label className="label has-text-danger">Information: &nbsp;<label className="has-text-weight-semibold">
                                        {user && user.information}
                                    </label></label>
                                </div>
                                <div className="field">
                                    <label className="label">Name</label>
                                    <div className="control">
                                        <input
                                            type="text"
                                            className="input"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Name"
                                            disabled
                                        />
                                    </div>
                                    <p className="has-text-centered has-text-danger">{nameError}</p>
                                </div>
                                <div className="field">
                                    <label className="label">Email</label>
                                    <div className="control">
                                        <input
                                            type="text"
                                            className="input"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Email"
                                        />
                                    </div>
                                    <p className="has-text-centered has-text-danger">{emailError}</p>
                                </div>
                                <div className="field">
                                    <label className="label">NIK/NIS</label>
                                    <div className="control">
                                        <input
                                            type="number"
                                            className="input"
                                            value={niknis}
                                            onChange={(e) => setNiknis(e.target.value)}
                                            placeholder="12345"
                                            disabled
                                        />
                                    </div>
                                    <p className="has-text-centered has-text-danger">{niknisError}</p>
                                </div>
                                </>
                            )}
                            {user && user.information === "NIK/NIS is wrong" &&(
                                <>
                                <p className="has-text-centered has-text-danger">{msg}</p>
                                <div className="field has-text-danger is-flex">
                                    <label className="label has-text-danger">Information: &nbsp;<label className="has-text-weight-semibold">
                                        {user && user.information}
                                    </label></label>
                                </div>
                                <div className="field">
                                    <label className="label">Name</label>
                                    <div className="control">
                                        <input
                                            type="text"
                                            className="input"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Name"
                                            disabled
                                        />
                                    </div>
                                    <p className="has-text-centered has-text-danger">{nameError}</p>
                                </div>
                                <div className="field">
                                    <label className="label">Email</label>
                                    <div className="control">
                                        <input
                                            type="text"
                                            className="input"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Email"
                                            disabled
                                        />
                                    </div>
                                    <p className="has-text-centered has-text-danger">{emailError}</p>
                                </div>
                                <div className="field">
                                    <label className="label">NIK/NIS</label>
                                    <div className="control">
                                        <input
                                            type="number"
                                            className="input"
                                            value={niknis}
                                            onChange={(e) => setNiknis(e.target.value)}
                                            placeholder="12345" 
                                        />
                                    </div>
                                    <p className="has-text-centered has-text-danger">{niknisError}</p>
                                </div>
                                </>
                            )}
                            <div className="field">
                                <div className="control">
                                    {!isMutating ? (
                                        <button type="submit" className="button is-success">
                                            Submit
                                        </button>
                                    ) : (
                                        <button type="submit" className="button is-success">
                                            Submiting...
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

export default FormEditRegistration;
