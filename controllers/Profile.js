import User from "../models/UserModel.js";

export const Profile = async (req, res) =>{
    if(!req.session.userId){
        return res.status(401).json({msg: "Mohon login ke akun Anda!"});
    }
    const user = await User.findOne({
        attributes:['uuid','name','email','nik_nis', 'registration_status','role'],
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