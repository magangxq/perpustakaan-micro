import express from "express";
import {getMemberApplicant, getMemberApplicantById, updateRegStatus} from "../controllers/Applicant.js";
import { verifyUser, SuperUser, regStatus } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/member-applicant', regStatus, verifyUser, SuperUser, getMemberApplicant);
router.get('/member-applicant/:id', regStatus, verifyUser, SuperUser, getMemberApplicantById);
router.patch('/member-applicant/:id', regStatus, verifyUser, SuperUser, updateRegStatus);

export default router;