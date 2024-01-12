const express = require('express');
const { checkRoute, register, login, logout } = require('../controllers/user');
const isAuthenticated = require('../middlewares/auth');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: APIs related to users
 */


/**
 * @swagger
 * /api/v1/user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               isAdmin:
 *                 type: boolean
 *             required:
 *               - name
 *               - email
 *               - password
 *               - isAdmin
 *     responses:
 *       200:
 *         description: User registered successfully
 */


router.post('/register', register);

/**
 * @swagger
 * /api/v1/user/login:
 *   post:
 *     summary: Login to the application
 *     tags: [Users]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User logged in successfully
 */

router.post('/login', login);

/**
 * @swagger
 * /api/v1/user/logout:
 *   get:
 *     summary: Logout from the application
 *     tags: [Users]
 *     security:
 *       - JWTAuth: []
 *     responses:
 *       200:
 *         description: User logged out successfully
 */

router.get('/logout', isAuthenticated, logout);


module.exports = router;
