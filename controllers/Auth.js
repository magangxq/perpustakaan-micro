import User from "../models/UserModel.js";
import argon2 from "argon2";
import { Op } from 'sequelize';

export const Login = async (req, res) =>{
    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    });
    if(!user) return res.status(404).json({msg: "User not found"});
    const match = await argon2.verify(user.password, req.body.password);
    if(!match) return res.status(400).json({msg: "Wrong Password"});
    req.session.userId = user.uuid;
    const uuid = user.uuid;
    const name = user.name;
    const email = user.email;
    const role = user.role;
    res.status(200).json({uuid, name, email, role});
}

export const Register = async (req, res) => {
    const { name, email, password, confPassword, nik_nis } = req.body;

    const existingUser = await User.findOne({
        where: {
            [Op.or]: [
                { email: email },
                { nik_nis: nik_nis }
            ]
        }
    });

    if (existingUser) {
        return res.status(400).json({ msg: "Email or NIK/NIS has already registered" });
    }

    if (password !== confPassword) {
        return res.status(400).json({ msg: "Password and Confirm Password doesn't match" });
    }

    const hashPassword = await argon2.hash(password);
    try {
        await User.create({
            name: name,
            email: email,
            password: hashPassword,
            nik_nis: nik_nis
        });
        res.status(201).send("Success Register");
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const logOut = (req, res) =>{
    req.session.destroy((err)=>{
        if(err) return res.status(400).send("Error: Can't Logout");
        res.status(200).send("You have been Logout..");
    });
}