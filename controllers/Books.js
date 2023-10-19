import Book from "../models/BookModel.js";
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
        if(!book) return res.status(404).json({msg: "Data tidak ditemukan"});
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
export const createBook = async(req, res) =>{
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
    try {
        await Book.create({
            code: code,
            cover: cover,
            title: title, 
            author: author, 
            publisher: publisher, 
            publication_year: publication_year,
            description: description,
            book_status: book_status,
            information: information 
        });
        res.status(201).json({msg: "Book Created Successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updateBook = async(req, res) =>{
    try {
        const book = await Book.findOne({
            where:{
                id: req.params.id
            }
        });
        if(!book) return res.status(404).json({msg: "Data tidak ditemukan"});
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
        if(!book) return res.status(404).json({msg: "Data tidak ditemukan"});
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