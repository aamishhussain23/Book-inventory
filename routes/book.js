const express = require('express');
const {
  checkRoute,
  viewAllBooks,
  specificBook,
  addBook,
  updateBook,
  deleteBook
} = require('../controllers/book');
const isAuthenticated = require('../middlewares/auth');
const isAdmin = require('../middlewares/admin');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: APIs related to books
 */


/**
 * @swagger
 * /api/v1/book/allBooks:
 *   get:
 *     summary: Retrieve a list of all books
 *     tags: [Books]
 *     security: []
 *     responses:
 *       200:
 *         description: List of books
 */

router.get('/allBooks', viewAllBooks);

/**
 * @swagger
 * /api/v1/book/getSpecificBook/{id}:
 *   get:
 *     summary: Retrieve details of a specific book
 *     tags: [Books]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the book
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Details of the specific book
 */

router.get('/getSpecificBook/:id', specificBook);

/**
 * @swagger
 * /api/v1/book/add-book:
 *   post:
 *     summary: Add a new book to the inventory
 *     tags: [Books]
 *     security:
 *       - JWTAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               isbn:
 *                 type: string
 *               genre:
 *                 type: string
 *               publicationYear:
 *                 type: integer
 *               price:
 *                 type: number
 *               quantity:
 *                 type: integer
 *               description:
 *                 type: string
 *             required:
 *               - title
 *               - author
 *               - isbn
 *               - genre
 *               - publicationYear
 *               - price
 *               - quantity
 *     responses:
 *       201:
 *         description: Book added successfully
 */


router.post('/add-book', isAuthenticated, isAdmin, addBook);

/**
 * @swagger
 * /api/v1/book/update-book/{id}:
 *   put:
 *     summary: Update details of a specific book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the book
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               isbn:
 *                 type: string
 *               genre:
 *                 type: string
 *               publicationYear:
 *                 type: integer
 *               price:
 *                 type: number
 *               quantity:
 *                 type: integer
 *               description:
 *                 type: string
 *             required:
 *               - title
 *               - author
 *               - isbn
 *               - genre
 *               - publicationYear
 *               - price
 *               - quantity
 *     security:
 *       - JWTAuth: []
 *     responses:
 *       200:
 *         description: Book updated successfully
 */

router.put('/update-book/:id', isAuthenticated, isAdmin, updateBook);

/**
 * @swagger
 * /api/v1/book/delete-book/{id}:
 *   delete:
 *     summary: Delete a specific book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the book
 *         schema:
 *           type: string
 *     security:
 *       - JWTAuth: []
 *     responses:
 *       200:
 *         description: Book deleted successfully
 */

router.delete('/delete-book/:id', isAuthenticated, isAdmin, deleteBook);

module.exports = router;
