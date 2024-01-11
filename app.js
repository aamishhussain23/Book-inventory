const express = require("express")
const {config} = require("dotenv")
const allBookRoutes = require("./routes/book")
const allUserRoutes = require("./routes/user")
const {errorMiddleware} = require('./middlewares/error')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()

config({
    path : './data/config.env'
})

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin : '*',
    methods : ["GET", "POST", "PUT", "DELETE"],
    credentials : true
}))

app.get('/', (req, res) => {
    res.json({
        success: true,
        apiInfo: [
            {
                category: "Books",
                description: "APIs related to books",
                server: "https://aamish-hussain-book-inventory.onrender.com/api/v1/book",
                endpoints: {
                    getAllBooks: "server/allBooks",
                    getSpecificBook: "server/getSpecificBook/:id",
                    addBook: "server/add-book",
                    updateBook: "server/update-book/:id",
                    deleteBook: "server/api/v1/delete-book/:id"
                }
            },
            {
                category: "Users",
                description: "APIs related to users",
                server: "https://aamish-hussain-book-inventory.onrender.com/api/v1/user",
                endpoints: {
                    register: "server/register",
                    login: "server/login",
                    logout: "server/logout",
                }
            }
        ]
    });
});

app.use('/api/v1/book', allBookRoutes)
app.use('/api/v1/user', allUserRoutes)



app.use(errorMiddleware)
module.exports = app