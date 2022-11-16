const express = require("express"); 
const router = require('./routes/index');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express(); 
const PORT = process.env.PORT || 8080; 

// For testing purposes 
app.get("/", (req, res) => { 
    res.send("<h2>It's Working!</h2>"); 
}); 

// midleware
app.use(express.json());
app.use("/api", router);
require('./swagger-setup')(app);

// connection a MongoDB
mongoose
    .connect(process.env.URL)
    .then(() => console.log('Connect to MongoDB'))
    .catch((error) => console.log('Failed connection to MongoDB'));

app.listen(PORT, () => { 
    console.log(`API is listening on port ${PORT}`); 
});
