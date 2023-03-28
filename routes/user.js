const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const user = require('../controllers/user')

// User registration
router.post('/register', user.registerController);

// User login
router.post('/login',user.loginController);

// User logout
router.post('/logout', user.logoutController);

module.exports = router;
