import express from "express";
import {Profile, editProfile, uploadProfilePicture} from "../controllers/Profile.js";
import { regStatus, verifyUser } from "../middleware/AuthUser.js";
import multer from 'multer';

const router = express.Router();
const upload = multer();

router.get('/profile', verifyUser,Profile);
router.patch('/edit-profile/:id', verifyUser, regStatus, editProfile);
router.post('/upload-picture', upload.single('profilePicture'), uploadProfilePicture);

export default router;