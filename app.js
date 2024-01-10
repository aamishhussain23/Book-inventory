const express = require("express")
const {config} = require("dotenv")

const app = express()

config({
    path : './data/config.env'
})


app.get('/', (req, res) => {
    res.json({
        success : true,
        message : "Server is working"
    })
})

module.exports = app