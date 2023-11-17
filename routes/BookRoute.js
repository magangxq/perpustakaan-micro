import express from "express";
import {
    getBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
} from "../controllers/Books.js";
import { verifyUser, pustakawan, regStatus } from "../middleware/AuthUser.js";
import { upload } from "../middleware/multer.js";


const router = express.Router();

router.get('/books', verifyUser, regStatus, getBooks);
router.get('/books/:id', verifyUser, regStatus, getBookById);
router.post('/books', verifyUser, regStatus, pustakawan, upload.single('bookCover'), createBook);
router.patch('/books/:id', verifyUser, regStatus, pustakawan, updateBook);
router.delete('/books/:id', verifyUser, regStatus, pustakawan, deleteBook);
// router.post('/upload-cover', verifyUser, regStatus, upload.single('bookCover'), uploadCover);


export default router;