const express = require("express")
const {checkRoute, register, login, logout} = require('../controllers/user')
const router = express.Router()

router.get('/', checkRoute)
router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)

module.exports = router