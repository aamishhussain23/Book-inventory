const express = require('express');
const swaggerUi = require('swagger-ui-express');
const specs = require('./swagger');
const { config } = require('dotenv');
const allBookRoutes = require('./routes/book');
const allUserRoutes = require('./routes/user');
const { errorMiddleware } = require('./middlewares/error');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

config({
  path: './data/config.env',
});

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

app.get('/', () => {
    res.json({
        success : true,
        message : "Api is working fine"
    })
})

// Serving Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/api/v1/book', allBookRoutes)
app.use('/api/v1/user', allUserRoutes)



app.use(errorMiddleware)
module.exports = app