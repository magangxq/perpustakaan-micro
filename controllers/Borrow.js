import Borrows from "../models/BorrowModel.js";
import User from "../models/UserModel.js";
import { DATE, DATEONLY, NOW, Op } from "sequelize";
import sequelize from "sequelize";
import Books from "../models/BookModel.js";

async function generateCustomBorrowCode() {
  const today = new Date();
  const year = today.getFullYear().toString();
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");

  const order = await Borrows.count({
    where: {
      createdAt: {
        [sequelize.Op.gte]: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate()
        ),
        [sequelize.Op.lt]: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + 1
        ),
      },
    },
  });
  const orderCode = (order + 1).toString().padStart(3, "0");

  return `perpus/peminjaman/${year}/${month}/${day}/${orderCode}`;
}

export const createRequest = async (req, res) => {
  const { due_date, bookId } = req.body;
  const customBorrowCode = await generateCustomBorrowCode();
  const userUuid = req.session.userId;

  // Mencari user berdasarkan UUID
  const user = await User.findOne({
    where: { uuid: userUuid },
  });

  const book = await Books.findOne({
    where: { id: bookId },
  });

  if (!book) {
    return res.status(404).json({ msg: "Book not found" });
  }

  // Pengecekan book_status
  if (book.book_status !== "Available") {
    return res.status(400).json({ msg: "Book is already borrowed" });
  }

  try {
    // Menggunakan ID user yang sudah ditemukan
    const borrow = await Borrows.create({
      code: customBorrowCode,
      borrow_date: DATEONLY(NOW),
      due_date: due_date,
      userId: user.id, // Menggunakan ID user yang sudah ditemukan
      bookId: bookId,
    });
    console.log(borrow);
    // Mengubah nilai kolom book_status dalam tabel Books
    await Books.update(
      { book_status: "Borrowed" }, // Atur nilai sesuai kebutuhan Anda
      { where: { id: bookId } }
    );

    res.status(201).json({ message: "Success", borrow });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const returnBook = async (req, res) => {
  const { id } = req.params; // Menggunakan params untuk mendapatkan borrowingId dari URL

  try {
    // Mencari entitas peminjaman berdasarkan borrowingId
    const borrow = await Borrows.findOne({
      where: {
        borrowing_id: id,
        borrowing_status: "Borrowed", // Memastikan buku sedang dipinjam sebelum dikembalikan
      },
    });

    if (!borrow) {
      return res
        .status(404)
        .json({ error: "Borrowing record not found or book is not borrowed" });
    }

    // Mencari buku berdasarkan bookId
    const book = await Books.findOne({
      where: { id: borrow.bookId },
    });

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    // Mengubah nilai kolom book_status dalam tabel Books menjadi 'Available' karena buku dikembalikan
    await Books.update(
      { book_status: "Available" },
      { where: { id: borrow.bookId } }
    );

    // Mengupdate tanggal pengembalian
    await borrow.update({
      returned_date: DATEONLY(NOW),
      borrowing_status: "Returned",
    });

    res.status(200).json({ message: "Book returned successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

