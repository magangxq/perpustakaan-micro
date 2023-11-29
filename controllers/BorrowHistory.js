import Borrows from "../models/BorrowModel.js";
import User from "../models/UserModel.js";
import Books from "../models/BookModel.js";

export const getBorrow = async (req, res) => {
  try {
    let response;
    response = await Borrows.findAll({
      where: {
        borrowing_status: "Borrowed",
      },
      attributes: [
        "borrowing_id",
        "code",
        "borrowing_status",
        "borrow_date",
        "returned_date",
        "userId",
        "bookId",
      ],
      include: [
        {
          model: User,
          as: "user",
          attributes: ["name"],
        },
        {
          model: Books,
          as: "book",
          attributes: ["title"],
        },
      ],
    });

    const formattedResponse = response.map((borrow) => ({
      borrowing_id: borrow.borrowing_id,
      code: borrow.code,
      borrowing_status: borrow.borrowing_status,
      borrow_date: borrow.borrow_date,
      returned_date: borrow.returned_date,
      userId: {
        userId: borrow.userId,
        nama: borrow.user.name,
      },
      bookId: {
        bookId: borrow.bookId,
        title: borrow.book.title,
      },
    }));

    res.status(200).json(formattedResponse);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getBorrowById = async (req, res) => {
  try {
    let response;
    response = await Borrows.findOne({
      where: {
        borrowing_id: req.params.id,
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["name"],
        },
        {
          model: Books,
          as: "book",
          attributes: ["title"],
        },
      ],
    });

    const formattedResponse = (borrow) => ({
      borrowing_id: borrow.borrowing_id,
      code: borrow.code,
      borrowing_status: borrow.borrowing_status,
      borrow_date: borrow.borrow_date,
      returned_date: borrow.returned_date,
      userId: {
        userId: borrow.userId,
        nama: borrow.user.name,
      },
      bookId: {
        bookId: borrow.bookId,
        title: borrow.book.title,
      },
    });

    res.status(200).json(formattedResponse(response));
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getBorrowReturned = async (req, res) => {
  try {
    let response;
    response = await Borrows.findAll({
      where: {
        borrowing_status: "Returned",
      },
      attributes: [
        "borrowing_id",
        "code",
        "borrowing_status",
        "borrow_date",
        "returned_date",
        "userId",
        "bookId",
      ],
      include: [
        {
          model: User,
          as: "user",
          attributes: ["name"],
        },
        {
          model: Books,
          as: "book",
          attributes: ["title"],
        },
      ],
    });

    const formattedResponse = response.map((borrow) => ({
      borrowing_id: borrow.borrowing_id,
      code: borrow.code,
      borrowing_status: borrow.borrowing_status,
      borrow_date: borrow.borrow_date,
      returned_date: borrow.returned_date,
      userId: {
        userId: borrow.userId,
        nama: borrow.user.name,
      },
      bookId: {
        bookId: borrow.bookId,
        title: borrow.book.title,
      },
    }));

    res.status(200).json(formattedResponse);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getBorrowRetrurnedById = async (req, res) => {
  try {
    let response;
    response = await Borrows.findOne({
      where: {
        borrowing_id: req.params.id,
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["name"],
        },
        {
          model: Books,
          as: "book",
          attributes: ["title"],
        },
      ],
    });

    const formattedResponse = (borrow) => ({
      borrowing_id: borrow.borrowing_id,
      code: borrow.code,
      borrowing_status: borrow.borrowing_status,
      borrow_date: borrow.borrow_date,
      returned_date: borrow.returned_date,
      userId: {
        userId: borrow.userId,
        nama: borrow.user.name,
      },
      bookId: {
        bookId: borrow.bookId,
        title: borrow.book.title,
      },
    });

    res.status(200).json(formattedResponse(response));
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getUserBorrowHistory = async (req, res) => {
    try {
      const userUuid = req.session.userId;
  
      // Mencari user berdasarkan UUID
      const user = await User.findOne({
        where: { uuid: userUuid },
      });
  
      // Memeriksa apakah user ditemukan
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Mencari riwayat peminjaman berdasarkan userId
      const borrowHistory = await Borrows.findAll({
        where: {
          userId: user.id,
        },
        include: [
          {
            model: User,
            attributes: ['name'], 
          },
          {
            model: Books,
            attributes: ['title'],
          },
        ],
      });
  
      res.status(200).json(borrowHistory);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error', error});
    }
  };
  
  
