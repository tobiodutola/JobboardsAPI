const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const jobsRouter = require('./routes/jobs');

const app = express();

// Body parser middleware
app.use(express.json());

// Connect to database
require('./db');




//routes
app.use('/jobs', jobsRouter);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));
