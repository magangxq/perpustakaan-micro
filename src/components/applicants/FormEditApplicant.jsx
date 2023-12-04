import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import API from "../../utils/api";

const FormEditApplicant = () => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [msg, setMsg] = useState("");
  const [isMutating, setIsMutating] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getApplicantById = async () => {
      try {
        const response = await axios.get(`${API.DETAIL_APPLICANT_URL}${id}`);
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
    setIsMutating(true);
    try {
      await axios.patch(`${API.EDIT_APPLICANT_URL}${id}`, {
        registration_status: status,
      });
      navigate("/applicants");
    } catch (error) {
      if (error.response) {
        setMsg("Invalid Switch Status Account");
        // setMsg(error.response.data.msg);
      }
    }
    setIsMutating(false);
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
                      <option value="waiting-verification">Waiting Verification</option>
                      <option value="Verified">Verified</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <div className="control">
                  {!isMutating ? (
                    <button type="submit" className="button is-success">
                      Update
                    </button>
                  ) : (
                    <button type="submit" className="button is-success">
                      Updating...
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

export default FormEditApplicant;
