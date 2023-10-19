import express from "express";
import {
    getUsers,
    getUserById,
    createUser,
    updateRole,
    deleteUser
} from "../controllers/Users.js";
import { verifyUser, SuperUser, regStatus } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/users', verifyUser, regStatus, SuperUser, getUsers);
router.get('/users/:id', verifyUser, regStatus, SuperUser, getUserById);
router.post('/users', verifyUser, regStatus, SuperUser, createUser);
router.patch('/update-role/:id', verifyUser, regStatus, SuperUser, updateRole);
router.delete('/users/:id', verifyUser, regStatus, SuperUser, deleteUser);

export default router;