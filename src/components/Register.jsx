import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    nik_nis: "",
    confPassword: "",
    password: "",
  });

  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!formData.name || !formData.email || !formData.nik_nis || !formData.password || !formData.confPassword) {
      setIsError(true);
      setMessage('Semua kolom harus diisi.');
      return;
    }

    if (formData.password !== formData.confPassword) {
      setIsError(true);
      setMessage('Konfirmasi kata sandi tidak sesuai');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:2000/auth/register", {
        name: formData.name,
        email: formData.email,
        nik_nis: formData.nik_nis,
        password: formData.password,
        confPassword: formData.confPassword
      });
      if (response.ok) {
        // console.log("Registrasi sukses:", response.data);
        navigate("/login");
        setIsLoading(false);
      } else {
        setIsError(true);
        setMessage("Gagal mendaftar. Silakan coba lagi.");
        setIsLoading(false);
      }
    } catch (error) {
      // console.error("Gagal mendaftar:", error);
      setIsError(true);
      setMessage("Gagal mendaftar. Silakan coba lagi.");
      setIsLoading(false);
    }
  };

  return (

    <div className="columns is-centered mt-3">
      <div className="column is-4">
        <form onSubmit={handleSubmit} className="box">
          {isError && <p className="has-text-centered">{message}</p>}
          <h1 className="title is-2">Registrasi</h1>
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input type="text" className="input" name="name" value={formData.username} onChange={handleChange} placeholder="Username" />
            </div>
          </div>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input type="email" className="input" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
            </div>
          </div>
          <div className="field">
            <label className="label">NIK/NIS</label>
            <div className="control">
              <input type="number" className="input" name="nik_nis" value={formData.nik_nis} onChange={handleChange} placeholder="12345" />
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input type="password" className="input" name="password" value={formData.password} onChange={handleChange} placeholder="******" />
            </div>
          </div>
          <div className="field">
            <label className="label">Confirm Password</label>
            <div className="control">
              <input type="password" className="input" name="confPassword" value={formData.confPassword} onChange={handleChange} placeholder="******" />
            </div>
          </div>
          <div className="field mt-5">
            <button type="submit" className="button is-success is-fullwidth">
              {isLoading ? "Loading..." : "Daftar"}
            </button>
          </div>
          <p className="text-black">Already have an account?</p>
          <a href="/login">
            <span className="text-blue-300">Login here!</span>
          </a>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
