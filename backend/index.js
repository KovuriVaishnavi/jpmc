// index.js
const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); 
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); 
    next();
});



// Routes
const userRoutes = require('./Routes/userRoutes');
app.use('/api/users', userRoutes);




//establishing mongodb connection
mongoose.connect("mongodb://127.0.0.1:27017/jpmchackathon").then(()=>{
    console.log("connection successful")
}).catch(()=>{
    console.log("connection unsuccessful")
})


// Starting the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
