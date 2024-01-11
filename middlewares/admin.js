const {ErrorHandler} = require("../middlewares/error")
const bookUserCollection = require("../models/user")

const isAdmin = async (req, res, next) => {
    try {
        const id = req.user._id

        const user = await bookUserCollection.findById(id)
        if(user.isAdmin) next()
        else{
            next(new ErrorHandler('You are not authorized', 401))
        }
    } catch (error) {
        next(new ErrorHandler(error.message, 500))
    }

}

module.exports = isAdmin