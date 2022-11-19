const express = require("express"); 
const projectRouter = require('./routes/projectRoutes')
const taskRouter = require('./routes/taskRoutes')
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');

const app = express(); 
const PORT = process.env.PORT || 8080; 

// For testing purposes 
app.get("/", (req, res) => { 
    res.send("<h2>It's Working!</h2>"); 
}); 
app.get('/cucumber', function(req, res) {
    res.sendFile(path.join(__dirname,'../test/cucumber-report.html'));
});
// midleware
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

