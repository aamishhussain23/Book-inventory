const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const db = await mongoose.connect(process.env.DB_URL)
        console.log(`Database connected with ${db.connection.host}`)
    } catch (error) {
        console.log(error.message)
        console.log('Database not connected')
    }
}

module.exports = connectDB