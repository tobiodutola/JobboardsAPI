const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const userRegister = async (req, res) => {
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' });
      }
  
      // Hash password
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
      // Create new user
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
      });
  
      // Save new user to database
      const savedUser = await newUser.save();
      res.json({ message: 'Registration successful' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

module.exports = userRegister;