import React, { useEffect } from "react";
import Layout from "../Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import FormEditApplicant from "../../components/applicants/FormEditApplicant";

const EditApplicant = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }

    if (user && user.role !== "developer" && user.role !== "admin") {
      navigate("/profile");
    }

  }, [isError, user, navigate]);
  return (
    <Layout>
      <FormEditApplicant />
    </Layout>
  );
};

export default EditApplicant;
