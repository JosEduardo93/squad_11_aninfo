const express = require("express"); 
const router = require('./routes/index');
const mongoose = require('mongoose');
require('dotenv').config();

// Swagger
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Module Proyect",
            version: "1.0.0",
            description:
              "API Module Project - MongoDB",
        },
        servers: [
            {
                url: "http://localhost:8080"
            }
        ]
    },
    apis: [`${path.join(__dirname, './routes/*.js')}`],
};


const app = express(); 
const PORT = process.env.PORT || 8080; 

// For testing purposes 
app.get("/", (req, res) => { 
    res.send("<h2>It's Working!</h2>"); 
}); 

// midleware
app.use(express.json());
app.use("/api", router);
app.use('/api-doc', 
    swaggerUi.serve, 
    swaggerUi.setup(swaggerJsDoc(options)));

// connection a MongoDB
mongoose
    .connect(process.env.URL)
    .then(() => console.log('Connect to MongoDB'))
    .catch((error) => console.log('Failed connection to MongoDB'));

app.listen(PORT, () => { 
    console.log(`API is listening on port ${PORT}`); 
});
