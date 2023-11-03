import User from "../models/UserModel.js";
import argon2 from "argon2";

export const Login = async (req, res) =>{
    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    });
    if (!user || !(await argon2.verify(user.password, req.body.password))) {
    return res.status(400).json({ msg: "Email / Password invalid" });
    }
    req.session.userId = user.uuid;
    const uuid = user.uuid;
    const name = user.name;
    const email = user.email;
    const role = user.role;
    res.status(200).json({uuid, name, email, role});
}

export const Register = async (req, res) => {
    const { name, email, password, confPassword, nik_nis } = req.body;
  
    // Validasi email dan nik_nis di database
    const existingUser = await User.findOne({ $or: [{ email: email }, { nik_nis: nik_nis }] });
    if (existingUser) {
      return res.status(400).json({ msg: "Email atau NIK/NIS sudah terdaftar." });
    }
  
    if (password !== confPassword) return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });
  
    const hashPassword = await argon2.hash(password);
  
    try {
      await User.create({
        name: name,
        email: email,
        password: hashPassword,
        nik_nis: nik_nis
      });
      res.status(201).json({ msg: "Register Berhasil" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  };
  

export const logOut = (req, res) =>{
    req.session.destroy((err)=>{
        if(err) return res.status(400).json({msg: "Tidak dapat logout"});
        res.status(200).json({msg: "Anda telah logout"});
    });
}