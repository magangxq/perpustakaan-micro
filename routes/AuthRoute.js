import express from "express";
import {Login, logOut, Register} from "../controllers/Auth.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.post('/login', Login);
router.delete('/logout', logOut, verifyUser);
router.post('/register', Register);

export default router;