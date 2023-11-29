import express from "express";
import { createRequest, returnBook } from "../controllers/Borrow.js";
import { getBorrow, getBorrowById, getBorrowReturned, getBorrowRetrurnedById, getUserBorrowHistory } from "../controllers/BorrowHistory.js";
import { verifyUser, regStatus, pustakawan } from "../middleware/AuthUser.js";
import { SuperUser } from "../middleware/AuthUser.js";


const router = express.Router();

router.patch('/return-book/:id', verifyUser, regStatus, pustakawan, returnBook);

router.get('/borrow', verifyUser, regStatus, pustakawan, getBorrow);
router.get('/borrow/:id', verifyUser, regStatus, pustakawan, getBorrowById);
router.get('/borrow-returned', verifyUser, regStatus, pustakawan, getBorrowReturned);
router.get('/borrow-returned/:id', verifyUser, regStatus, pustakawan, getBorrowRetrurnedById);

router.post('/borrow', verifyUser, regStatus, createRequest);
router.get('/history', verifyUser, regStatus, getUserBorrowHistory);

export default router;