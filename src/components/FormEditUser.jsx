import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const FormEditUser = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [msg, setMsg] = useState("");
  const [isMutating, setIsMutating] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getUserById = async () => {
      try {
        const response = await axios.get(`http://localhost:2000/member-list/users/${id}`);
        setName(response.data.name);
        setRole(response.data.role);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getUserById();
  }, [id]);

  const updateUser = async (e) => {
    e.preventDefault();
    setIsMutating(true)
    try {
      await axios.patch(`http://localhost:2000/member-list/update-role/${id}`, {
        role: role,
      });
      navigate("/users");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
    setIsMutating(false);
  };
  return (
    <div>
      <h1 className="title">Users</h1>
      <h2 className="subtitle">Update Role {name}</h2>
      <Link to="/users" className="button is-danger mb-2">
        Cancel
      </Link>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updateUser}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Role</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="developer">Developer</option>
                      <option value="admin">Admin</option>
                      <option value="pustakawan">Pustakawan</option>
                      <option value="anggota">Anggota</option>
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

export default FormEditUser;
