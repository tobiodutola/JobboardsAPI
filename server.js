const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = require('./db')



// Connect to database
connectDB();

// Body parser middleware
app.use(express.json());  



//home route
app.get('/',async (req, res) => {
    res.json("home page");
  })


//routes
app.use('/jobs', jobsRouter);
//app.use('/jobs', userRouter);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));
