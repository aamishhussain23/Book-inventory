const express = require("express")
const {checkRoute, register, login} = require('../controllers/user')
const router = express.Router()

router.get('/', checkRoute)
router.post('/register', register)
router.post('/login', login)

module.exports = router