import User from "../models/UserModel.js";
import { v4 as uuidv4 } from "uuid";
import cloudinary from "../utils/cloudinary.js";

export const Profile = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Please LogIn first!" });
  }
  const user = await User.findOne({
    attributes: [
      "uuid",
      "name",
      "email",
      "nik_nis",
      "registration_status",
      "role",
      "picture",
      "information",
    ],
    where: {
      uuid: req.session.userId,
    },
  });
  if (!user) return res.status(404).json({ msg: "User not found" });
  res.status(200).json(user);
};

export const editRegistration = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User not found" });
  const { name, email, nik_nis } = req.body;
  try {
    await User.update(
      {
        name: name,
        email: email,
        nik_nis: nik_nis,
        registration_status: "waiting-verification",
        information: null, // I assumed you want to set it to an empty string
      },
      {
        where: {
          id: user.id,
        },
      }
    );

    res.status(200).json({ msg: "Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const editProfile = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User not found" });
  const { name } = req.body;
  try {
    await User.update(
      {
        name: name,
      },
      {
        where: {
          id: user.id,
        },
      }
    );
    res.status(200).json({ msg: "Name Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const uploadImage = async (req, res) => {
  try {
    const userUuid = req.session.userId;

    // Find the user based on the session UUID
    const user = await User.findOne({
      where: { uuid: userUuid },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    cloudinary.uploader.upload(
      req.file.path,
      { folder: `project-perpus/users-picture` },
      async function (err, result) {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            message: err,
          });
        }

        user.picture = result.secure_url;
        await user.save();

        return res.json({
          success: true,
          message: "Success upload profile picture.",
          data: result,
        });
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "An error occurred while uploading the profile picture.",
      error,
    });
  }
};
