const express = require("express")
const {checkRoute, register} = require('../controllers/user')
const router = express.Router()

router.get('/', checkRoute)
router.post('/register', register)

module.exports = router