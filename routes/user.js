const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// User registration
router.post('/register', async (req, res) => {
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
});

// User login
router.post('/login', async (req, res) => {
  try {
    // Find user by email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check if password is correct
    const passwordMatch = await bcrypt.compare(req.body.password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Create and sign JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// User logout
router.post('/logout', (req, res) => {
  // No action needed on server-side, client-side should delete token
  res.json({ message: 'Logout successful' });
});

module.exports = router;
