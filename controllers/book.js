const isValidISBN = require("../middlewares/isbn")
const { ErrorHandler } = require("../middlewares/error")
const bookCollection = require("../models/book")

const checkRoute = (req, res) => {
    res.json({
        success : true,
        message : "book route is working"
    })
}

const viewAllBooks = async (req, res, next) => {
    try {
        // Fetching all books from the database
        const Books = await bookCollection.find()

        // Sending a success response with the list of all books
        res.json({
            success: true,
            Books,
        })

    } catch (error) {
        // Handle any unexpected errors
        next(new ErrorHandler(error.message, 500))
    }
}

const specificBook = async (req, res, next) => {
    const { id } = req.params;

    try {
        // Fetching a specific book from the database by its ID
        const book = await bookCollection.findById(id)

        // Checking if the book with the given ID exists or not
        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found',
            })
        }

        // Sending a success response with the specific book
        res.json({
            success: true,
            book,
        })

    } catch (error) {
        next(new ErrorHandler(error.message, 500))
    }
}

const addBook = async (req, res, next) => {
    const {title, author, isbn, genre, publicationYear, price, quantity, description} = req.body

    try {
        // Checking if required fields are missing
        if(!title || !author || !isbn || !genre || 
           !publicationYear || !price || !quantity
           || !description) return next(new ErrorHandler('All fields are required', 400))

        // Validating ISBN
        if(isValidISBN(isbn) === false) return next(new ErrorHandler('Invalid ISBN', 422))
        
        // Now creating new book in database
        const new_book = await bookCollection.create({...req.body, user : req.user._id})
        
        // Sending a success response
        res.status(201).json({
            success : true,
            message : 'Book added successfully'
        })
    } catch (error) {
        if(error.code === 11000) next(new ErrorHandler('Duplicate ISBN is not allowed', 409))
        next(new ErrorHandler(error.message, 500))
    }
}

const updateBook = async (req, res, next) => {

    const { id } = req.params
    const { title, author, isbn, genre, publicationYear, price, quantity, description } = req.body

    try {
        // Checking if required fields are missing
        if(!title || !author || !isbn || !genre || 
            !publicationYear || !price || !quantity
            || !description) return next(new ErrorHandler('All fields are required', 400))
        
        // Validating ISBN
        if (isValidISBN(isbn) === false) return next(new ErrorHandler('Invalid ISBN', 422))
        

        // Now Updating book in database
        const updatedBook = await bookCollection.findByIdAndUpdate(id, {...req.body,}, { new: true })

        // Check if the book with the given ID exists
        if (!updatedBook) return next(new ErrorHandler('Book not found', 404))

        // Sending a success response
        res.json({
            success: true,
            message: 'Book updated successfully',
        });
    }
    catch(error){
        if(error.code === 11000) next(new ErrorHandler('Duplicate ISBN is not allowed', 409))
        next(new ErrorHandler(error.message, 500))
    }

}

const deleteBook = async (req, res) => {
    const { id } = req.params

    try {
        // Deleting the book from the database
        const deletedBook = await bookCollection.findByIdAndDelete(id)

        // Checking if the book with the given ID exists or not
        if (!deletedBook) {
            return res.status(404).json({
                success: false,
                message: 'Book not found',
            })
        }

        // Sending a success response
        res.json({
            success: true,
            message: 'Book deleted successfully',
        })

    } catch (error) {
        // Handle any unexpected errors
        next(new ErrorHandler(error.message, 500))
    }
}

module.exports = {checkRoute, addBook, updateBook, deleteBook, viewAllBooks, specificBook}