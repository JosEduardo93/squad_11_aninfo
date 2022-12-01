const express = require("express"); 
const cors = require("cors")
const projectRouter = require('./routes/projectRoutes')
const taskRouter = require('./routes/taskRoutes')
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');

const app = express(); 
const PORT = process.env.PORT || 8080; 

// For testing purposes 
app.get("/", (req, res) => { 
    res.send("<h2>Squad 11 - Modulo de proyectos</h2>\
              <a href='https://github.com/JosEduardo93/squad_11_aninfo/'> <p>Link al repositorio</p></a>\
              <a href='/api-doc'><p>Link a la documentacion Swagger de la api</p></a>"); 
}); 

// midleware
app.use(cors({
    origin:"*"
}));
app.use(express.json());
app.use('/api', projectRouter);
app.use('/api', taskRouter);
require('./swagger-setup')(app);

// connection to MongoDB
mongoose
    .connect(process.env.URL)
    .then(() => console.log('Connect to MongoDB'))
    .catch((error) => console.log('Failed connection to MongoDB'));

app.listen(PORT, () => { 
    console.log(`API is listening on port ${PORT}`); 
});

