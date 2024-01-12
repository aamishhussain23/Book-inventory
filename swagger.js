const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Book Inventory API',
      version: '1.0.0',
      description: 'APIs related to books and users',
      contact: {
        name: 'Aamish Hussain',
        email: 'aamishhussain23@gmail.com',
        url: 'https://github.com/aamishhussain23/Book-inventory.git', 
      },
    },
    components: {
      securitySchemes: {
        JWTAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'token',
        },
      },
    },
    security: [
      {
        JWTAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
