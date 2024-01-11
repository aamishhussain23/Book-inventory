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

    try {

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
    } catch (error) {
        next(new ErrorHandler(error.message, 500))
    }
    
}


const login = async (req, res, next) => {
    const {email, password} = req.body
    
    try {

        // here checking whether user provided all the fields or not
        if(!email || !password) return next(new ErrorHandler("All Fields are required", 400))

        // get the user of particular email
        const user = await bookUserCollection.findOne({email}).select('+password')

        // if not exists or wrong email or wrong password
        if(!user){
            return next(new ErrorHandler('Invalid email or password', 404))
        }
        
        // now checking password
        const password_match = await bcrypt.compare(password, user.password)

        // getting first word of name
        const words = user.name.split(' ');
        const trimmedName = words.slice(0, 1).join(' ');
        
        // if password is correct
        if(password_match){
            return setCookie(res, user._id, 200, `Welcome ${trimmedName}`)
        }  
        
        // else password is not correct
        return next(new ErrorHandler('Invalid email or password', 404))
    } catch (error) {
        next(new ErrorHandler(error.message, 500))
    }
}


const logout = (req, res, next) => {
    try {
        res.status(200).cookie("token", "", {expires : new Date(Date.now()), 
        sameSite : process.env.NODE_ENV === "Development" ? "lax" : "none", 
        secure :   process.env.NODE_ENV === "Development" ? false : true
    }).json({
            success : true,
            message : "logged out"
        })
    } catch (error) {
        next(new ErrorHandler(error.message, 500))
    }
}

module.exports = {checkRoute, register, login, logout}