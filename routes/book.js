const express = require("express")
const {checkRoute} = require('../controllers/book')

const router = express.Router()

router.get('/', checkRoute)

module.exports = router