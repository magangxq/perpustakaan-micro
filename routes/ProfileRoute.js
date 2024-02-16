import express from "express";
import {Profile, editProfile, uploadImage, editRegistration} from "../controllers/Profile.js";
import { regStatus, verifyUser } from "../middleware/AuthUser.js";
import { upload } from "../middleware/multer.js";


const router = express.Router();

router.get('/profile', verifyUser, Profile);
router.patch('/edit-profile/:id', verifyUser, regStatus, editProfile);
router.post('/upload-picture', verifyUser, regStatus,upload.single('profilePicture'), uploadImage);
router.patch('/edit-registration/:id', verifyUser, editRegistration);

export default router;