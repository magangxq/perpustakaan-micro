import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";

const Userlist = () => {
  const [users, setUsers] = useState([]);
  const [filterUser, setFilterUser] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:2000/member-list/users");
    setUsers(response.data);
  };

  const filteredUsers = users.filter((user) => {
    const titleMatch = user.name.toLowerCase().includes(filterUser.toLowerCase());
    const roleMatch = filterRole === "all" || user.role === filterRole;
    return titleMatch && roleMatch;
  });

  const roleOptions = ["all", "developer", "admin", "pustakawan", "anggota"]

  return (
    <div>
      <h1 className="title">Users</h1>
      <h2 className="subtitle">List of Users</h2>
      <div className="is-flex is-justify-content-space-between">
        <div className="mb-2">
        <label>Role : </label>
          <select
            className="p-1"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            {roleOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="is-flex is-align-items-center mb-2">
          <input
            type="text"
            className="p-1 mr-1 is-rounded"
            placeholder="Filter by Name"
            value={filterUser}
            onChange={(e) => setFilterUser(e.target.value)}
          />
          <IoSearch style={{ fontSize: "25px" }} />
        </div>
      </div>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={user.uuid}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              {/* <td>{user.nik_nis}</td> */}
              <td>{user.role}</td>
              <td>
                <Link
                  to={`/users/detail/${user.id}`}
                  className="button is-small is-info mr-2"
                >
                  Detail
                </Link>
                <Link
                  to={`/users/edit/${user.id}`}
                  className="button is-small is-warning mr-2"
                >
                  Edit Role
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Userlist;
