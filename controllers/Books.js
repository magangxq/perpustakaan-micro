import Book from "../models/BookModel.js";
import sequelize from "sequelize";
import cloudinary from "../utils/cloudinary.js";
import User from "../models/UserModel.js"
import {Op} from "sequelize";

export const getBooks = async (req, res) =>{
    try {
        let response;
        response = await Book.findAll({
            attributes:[
                'id',
                'code',
                'cover',
                'title',
                'author',
                'publisher',
                'publication_year',
                'description',
                'book_status',
                'information'
            ],
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getBookById = async(req, res) =>{
    try {
        const book = await Book.findOne({
            where:{
                id: req.params.id
            },
            attributes:[
                'id',
                'code',
                'cover',
                'title',
                'author',
                'publisher',
                'publication_year',
                'description',
                'book_status',
                'information'
            ],
        });
        if(!book) return res.status(404).json({msg: "Data not found"});
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}


export const createBook = async (req, res) => {
    try {
      const customBookCode = await generateCustomBookCode();
  
      const {
        title,
        author,
        publisher,
        publication_year,
        description,
        book_status,
        information,
      } = req.body;
  
      cloudinary.uploader.upload(req.file.path, { folder: `project-perpus/books-cover` }, async function (err, result) {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            message: err
          });
        }
  
        const coverUrl = result.secure_url;
  
        const newBook = await Book.create({
          code: customBookCode,
          title: title,
          author: author,
          publisher: publisher,
          publication_year: publication_year,
          description: description,
          book_status: book_status,
          information: information,
          cover: coverUrl
        });
  
        res.status(201).json({ msg: "Book Created Successfully", book: newBook });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: error.message });
    }
  };
  
  // Fungsi untuk menghasilkan kode buku custom
  async function generateCustomBookCode() {
    const today = new Date();
    const year = today.getFullYear().toString().slice(-2); // Mengambil dua digit terakhir tahun
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Mengambil bulan dengan 2 digit (01 - 12)
    const day = today.getDate().toString().padStart(2, '0'); // Mengambil hari dengan 2 digit (01 - 31)
  
    // Di sini Anda perlu menggantikan "001" dengan logika untuk menghitung urutan buku pada hari tersebut dari database.
    // Anda dapat menggunakan Sequelize untuk mengambil data buku pada hari tersebut dan menghitung jumlahnya, lalu menambahkan 1.
    // Misalnya:
    const order = await Book.count({
      where: {
        createdAt: {
          [sequelize.Op.gte]: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
          [sequelize.Op.lt]: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
        },
      },
    });
    const orderCode = (order + 1).toString().padStart(3, '0'); // Format urutan dengan 3 digit (001 - 999)
  
    return `smkn12malang/perpus/${year}/${month}/${day}/${orderCode}`;
  }

export const updateBook = async(req, res) =>{
    try {
        const book = await Book.findOne({
            where:{
                id: req.params.id
            }
        });
        if(!book) return res.status(404).json({msg: "Data not found"});
        const {
            code,
            cover,
            title, 
            author, 
            publisher, 
            publication_year,
            description,
            book_status,
            information
        } = req.body;
        await Book.update({code, cover, title, author, publisher, publication_year, description, book_status, information},{
            where:{
                id: book.id
            }
        });
        res.status(200).json({msg: "Book updated successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deleteBook = async(req, res) =>{
    try {
        const book = await Book.findOne({
            where:{
                id: req.params.id
            }
        });
        if(!book) return res.status(404).json({msg: "Data not found"});
        await Book.destroy({
            where:{
                id: book.id
            }
        });
        res.status(200).json({msg: "Book deleted successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}



//--- id - code - cover - title - author 
// - publisher - publication_year 
// - description - book_status - information