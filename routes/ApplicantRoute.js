import express from "express";
import {getMemberApplicant, getMemberApplicantById, updateRegStatus, getMemberApplicantRejected, getMemberApplicanRejectedtById} from "../controllers/Applicant.js";
import { verifyUser, SuperUser, regStatus } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/member-applicant', regStatus, verifyUser, SuperUser, getMemberApplicant);
router.get('/member-applicant/:id', regStatus, verifyUser, SuperUser, getMemberApplicantById);
router.patch('/member-applicant/:id', regStatus, verifyUser, SuperUser, updateRegStatus);
router.get('/member-applicant-rejected', regStatus, verifyUser, SuperUser, getMemberApplicantRejected);
router.get('/member-applicant-rejected/:id', regStatus, verifyUser, SuperUser, getMemberApplicanRejectedtById);

export default router;