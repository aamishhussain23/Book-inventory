const express = require("express")
const {config} = require("dotenv")
const allBookRoutes = require("./routes/book")

const app = express()

config({
    path : './data/config.env'
})


app.use('/api/v1/book', allBookRoutes)

module.exports = app