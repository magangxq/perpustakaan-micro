import User from "../models/UserModel.js";

export const getMemberApplicant = async(req, res) =>{
    try {
        const response = await User.findAll({
            attributes:['id','uuid','name','email', 'nik_nis', 'registration_status', 'role'],
            where: {
                registration_status: 'verifikasi'
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getMemberApplicantById = async(req, res) =>{
    try {
        const response = await User.findOne({
            attributes:['id','uuid','name','email', 'nik_nis', 'registration_status', 'role'],
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updateRegStatus = async(req, res) =>{
    const user = await User.findOne({
        where: {
            id: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    const {registration_status} = req.body;
    try {
        await User.update({
            registration_status: registration_status
        },{
            where:{
                id: user.id
            }
        });
        res.status(200).json({msg: "Registration Status Updated"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}
