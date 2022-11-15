// Definitions
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
    info: {
        title: "Module Proyect",
        version: "1.0.0",
        description:
          "API Module Project",
    },
    servers: ["http://localhost:3000/"],
};

const swaggerOptions = {
    swaggerDefinition,
    apis: ["./routes/*.js"],
}

/**
 * Setup Swagger UI
 * @param {express} app Aplication express
 */
 const setup = app => app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerOptions, {explorer: true})));

 module.exports = setup;