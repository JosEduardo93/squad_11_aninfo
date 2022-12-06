const express = require("express"); 
const cors = require("cors")
const axios = require("axios")
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

app.use(cors()); //adding cors middleware to the express with above configurations

app.use(express.json());
app.use('/api', projectRouter);
app.use('/api', taskRouter);
require('./swagger-setup')(app);


app.use("/clientes", (req, res) => {
  axios({
    method: 'get',
    url: "https://anypoint.mulesoft.com/mocking/api/v1/sources/exchange/assets/754f50e8-20d8-4223-bbdc-56d50131d0ae/clientes-psa/1.0.0/m/api/clientes",
    headers : {
      'Access-Control-Allow-Origin': "*"
    }
  })
  .then(response => res.send(response.data))
})

// connection to MongoDB
mongoose
  .connect(process.env.URL)
  .then(() => console.log('Connect to MongoDB'))
  .catch((error) => console.log('Failed connection to MongoDB'));

app.listen(PORT, () => { 
    console.log(`API is listening on port ${PORT}`); 
});

