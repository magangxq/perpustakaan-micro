import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoPerson, IoHome, IoLogOut, IoBook, IoPersonAdd } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div>
      <aside className="menu pl-2 has-shadow">

        <p className="menu-label">General</p>
        <ul className="menu-list is-align-items-center">
          <li>
            <NavLink to={"/profile"}>
              <IoHome /> Profile
            </NavLink>
          </li>
          {user && user.registration_status !== "verifikasi" && (
            <li>
              <NavLink to={"/books"}>
                <IoBook /> Books
              </NavLink>
            </li>
          )}
        </ul>
        {user && user.role !== "anggota" && user.role !== "pustakawan" && (
          <div>
            <p className="menu-label">Admin</p>
            <ul className="menu-list">
              <li>
                <NavLink to={"/applicants"}>
                  <IoPersonAdd /> Member Applicants
                </NavLink>
                <NavLink to={"/users"}>
                  <IoPerson /> Users
                </NavLink>
              </li>
            </ul>
          </div>
        )}
        <p className="menu-label">Settings</p>
        <ul className="menu-list">
          <li>
            <button onClick={logout} className="button is-white">
              <IoLogOut /> Logout
            </button>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
