import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import API from "../../utils/api";

const FormUploadProfile = () => {
    const [picture, setPicture] = useState("");
    const [pictureError, setPictureError] = useState("");
    const [isMutating, setIsMutating] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

    const uploadProfile = async () => {
        // e.preventDefault();

        // if (!picture) {
        //     setPictureError("Profile Picture is required")
        //     return;
        // }

        console.log(picture)
        setIsMutating(true)
        try {
            console.log(FormData)
            const formData = new FormData();
            console.log(formData)
            console.log(selectedFile)
            formData.append('file', selectedFile);
            console.log("log")
            const response = await axios.post(API.UPLOAD_PROFILE_URL, formData);
            if (response) {
                navigate("/profile")
                console.log(response)
            } else {
                console.log(response)
            }
            console.log(response.data);
            navigate("/profile");
            // Lakukan sesuatu dengan response jika diperlukan
          } catch (error) {
            console.error('Error uploading the image: ', error);
            setMsg(error)
          }
        setIsMutating(false)
    }

    return (
        <div>
            <h1 className="title">Profile</h1>
            <h2 className="subtitle">Upload Profile Picture {user && user.name}</h2>
            <Link to="/profile" className="button is-danger mb-2">
                Cancel
            </Link>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        {/* <form onSubmit={uploadProfile}> */}
                            <p className="has-text-centered has-text-danger">{msg}</p>
                            <div className="field">
                                <label className="label">Profile Picture</label>
                                <div className="control">
                                    <input
                                        type="file"
                                        className="input"
                                        accept="image/*"
                                        // value={picture}
                                        onChange={handleFileChange}
                                        placeholder="Profile Picture"
                                    />
                                </div>
                                <p className="has-text-centered has-text-danger">{pictureError}</p>
                            </div>
                            <div className="field">
                                <div className="control">
                                    {!isMutating ? (
                                        <button onClick={uploadProfile} className="button is-success">
                                            Upload
                                        </button>
                                    ) : (
                                        <button type="submit" className="button is-success">
                                            Uploading...
                                        </button>
                                    )}
                                </div>
                            </div>
                        {/* </form> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormUploadProfile;