const jwt = require('jsonwebtoken')
const {ErrorHandler} = require("../middlewares/error")
const bookUserCollection = require('../models/user')

const isAuthenticated = async (req, res, next) => {
    try {
        const {token} = req.cookies
        
        if(!token) return next(new ErrorHandler('Login First', 404))
        
        const data = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await bookUserCollection.findById(data._id)
        next()
    } catch (error) {
        next(new ErrorHandler(error.message, 500))
    }

}

module.exports = isAuthenticated