import User from "../models/UserModel.js";
import { v4 as uuidv4 } from 'uuid';
import cloudinary from "../utils/cloudinary.js";

export const Profile = async (req, res) =>{
    if(!req.session.userId){
        return res.status(401).json({msg: "Mohon login ke akun Anda!"});
    }
    const user = await User.findOne({
        attributes:['uuid','name','email','nik_nis', 'registration_status', 'role', 'picture'],
        where: {
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    res.status(200).json(user);
}

export const editProfile = async(req, res) =>{
    const user = await User.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    const {name} = req.body;
    try {
        await User.update({
            name: name
        },{
            where:{
                id: user.id
            }
        });
        res.status(200).json({msg: "Name Updated"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const uploadImage = async (req, res) => {
    try {
      const userUuid = req.session.userId;
  
      // Find the user based on the session UUID
      const user = await User.findOne({
        where: { uuid: userUuid },
      });
  
      if (!user) {
        return res.status(404).json({ error: 'Pengguna tidak ditemukan.' });
      }
  
      cloudinary.uploader.upload(req.file.path, { folder: `project-perpus/users-picture` }, async function (err, result) {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            message: err
          });
        }
  
        user.picture = result.secure_url;
        await user.save();
  
        return res.json({
          success: true,
          message: 'Gambar profil berhasil diunggah.',
          data: result
        });
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Terjadi kesalahan saat mengunggah gambar profil.' });
    }
  };
  