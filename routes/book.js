const express = require("express")
const {checkRoute, viewAllBooks, specificBook, addBook, updateBook, deleteBook} = require('../controllers/book')
const isAuthenticated = require("../middlewares/auth")
const isAdmin = require("../middlewares/admin")

const router = express.Router()

router.get('/', checkRoute)
router.get('/allBooks', viewAllBooks)
router.get('/getSpecificBook/:id', specificBook)
router.post('/add-book', isAuthenticated, isAdmin, addBook)
router.put('/update-book/:id', isAuthenticated, isAdmin, updateBook)
router.delete('/delete-book/:id', isAuthenticated, isAdmin, deleteBook)

module.exports = router