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

var cors = require('cors'); //import cors module

var whitelist = ['https://squad11-proyectos.onrender.com', 'http://localhost:8080', 'https://project-s11.onrender.com']; //white list consumers
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH', 'OPTIONS'],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true, //Credentials are cookies, authorization headers or TLS client certificates.
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'device-remember-token', 'Access-Control-Allow-Origin', 'Origin', 'Accept']
};

app.use(cors(corsOptions)); //adding cors middleware to the express with above configurations




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

