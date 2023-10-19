import express from "express";
import {Profile, editProfile} from "../controllers/Profile.js";
import { regStatus, verifyUser } from "../middleware/AuthUser.js";
const router = express.Router();

router.get('/profile', verifyUser,Profile);
router.patch('/edit-profile/:id', verifyUser, regStatus, editProfile);

export default router;