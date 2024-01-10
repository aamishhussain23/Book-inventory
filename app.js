const express = require("express")
const {config} = require("dotenv")
const allBookRoutes = require("./routes/book")
const allUserRoutes = require("./routes/user")
const {errorMiddleware} = require('./middlewares/error')

const app = express()

config({
    path : './data/config.env'
})

app.use(express.json())
app.use('/api/v1/book', allBookRoutes)
app.use('/api/v1/user', allUserRoutes)



app.use(errorMiddleware)
module.exports = app