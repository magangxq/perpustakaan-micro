import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const FormEditApplicant = () => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getApplicantById = async () => {
      try {
        const response = await axios.get(`http://localhost:2000/member-applicant/${id}`);
        setName(response.data.name);
        setStatus(response.data.registration_status);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getApplicantById();
  }, [id]);

  const updateApplicant = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:2000/member-applicant/${id}`, {
        registration_status: status,
      });
      navigate("/applicants");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  return (
    <div>
      <h1 className="title">Applicants</h1>
      <h2 className="subtitle">Update Registration Status {name}</h2>
      <Link to="/applicants" className="button is-danger mb-2">
          Cancel
        </Link>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updateApplicant}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Role</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="verifikasi">Verifikasi</option>
                      <option value="diterima">Terima</option>
                      <option value="ditolak">Tolak</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Update
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

export default FormEditApplicant;
