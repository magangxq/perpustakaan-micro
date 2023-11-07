import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProfileUser = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="container" >
      <h1 className="title">Profile</h1>
      <h2 className="subtitle">
        Welcome Back <strong>{user && user.name}</strong>
      </h2>
      <div className="columns is-centered">
        <div className="column is-half">
          <div className="box has-background-primary">
            <div className="content ">
              <div className="field has-text-white is-flex is-justify-content-center">
                <label className="label has-text-white ">Name: &nbsp;<label className="has-text-weight-semibold">
                  {user && user.name}
                </label></label>
              </div>
              <div className="field has-text-white is-flex is-justify-content-center">
                <label className="label has-text-white">Email: &nbsp;<label className="has-text-weight-semibold">
                  {user && user.email}
                </label></label>
              </div>
              <div className="field has-text-white is-flex is-justify-content-center">
                <label className="label has-text-white">NIK/NIS: &nbsp;<label className="has-text-weight-semibold">
                  {user && user.nik_nis}
                </label></label>
              </div>
              <div className="field">
                <label className="label has-text-white is-flex is-justify-content-center">Role: &nbsp;<label className="has-text-weight-semibold">
                  {user && user.role}
                </label></label>
              </div>
              {user && user.registration_status === "verifikasi" && (
                <>
                  <div className="field">
                    <label className="label has-text-white is-flex is-justify-content-center">Status: &nbsp;<label className="has-text-weight-semibold ">
                      {user && user.registration_status}
                    </label></label>
                  </div>
                  <div className="field mt-5">
                    <label className="has-text-weight-semibold is-flex is-justify-content-center">
                      Your Account Is Still In The Verification Stage,<br />Wait Until The Admin Approves Your Registration Request
                    </label>
                  </div>
                </>
              )}
              {user && user.registration_status !== "verifikasi" && (
                <div className="is-flex is-justify-content-center">
                  <Link
                    to={`/profile/edit`}
                    className="button is-info mt-5"
                  >
                    Edit Profile
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <div className="columns is-centered" style={{marginTop : "30vh"}}>
        <a href="javascript:window.print()" className="is-centered mt-6">Download Profile Page as a PDF</a>
      </div> */}
    </div>
  );
};

export default ProfileUser;
