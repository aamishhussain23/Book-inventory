const bcrypt = require("bcrypt")


const {ErrorHandler} = require("../middlewares/error")
const bookUserCollection = require('../models/user')
const setCookie = require("../utils/cookie")

const checkRoute = (req, res) => {
    res.json({
        success : true,
        message : "user route is working"
    })
}

const register = async (req, res, next) => {
    const {name, email, password, isAdmin} = req.body

    // here checking whether user provided all the fields or not
    if(!name || !email || !password) return next(new ErrorHandler("All Fields are required", 400))

    const user = await bookUserCollection.findOne({email})

    // here checking whether same email is already exist or not if yes then showing error
    if(user) return next(new ErrorHandler("User Already Exists", 400))


    // creating new user

    // hashing password first
    const hashed_password = await bcrypt.hash(password, 10)
    const new_user = await bookUserCollection.create({name, email, password : hashed_password})

    // getting first word of name
    const words = name.split(' ');
    const trimmedName = words.slice(0, 1).join(' ');

    // setting cookie
    return setCookie(res, new_user._id, 201, `${trimmedName} registered successfully`)
    
}

module.exports = {checkRoute, register}