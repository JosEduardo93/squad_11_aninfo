const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Module Project",
            version: "1.0.0",
            description:
              "API Module Project - MongoDB",
        },
        servers: [
            {
                url: "https://squad11-proyectos.onrender.com"
            }
        ]
    },
    apis: [`${path.join(__dirname, './routes/*.js')}`],
};

module.exports = function(app) {(
   app.use('/api-doc',
   swaggerUi.serve,
   swaggerUi.setup(swaggerJsDoc(options)))
)};

