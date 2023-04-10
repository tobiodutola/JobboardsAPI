const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const saltPassword = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, saltPassword);
    const user = new User({
      name,
      email,
      password: hashedPassword
    });
    await user.save();
    res.status(201).json({
      message: 'User created successfully!'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Something went wrong.'
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password.'
      });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({
        message: 'Invalid email or password.'
      });
    }
    const token = jwt.sign(
      { userId: user._id },
      process.env.secret_key,
      { expiresIn: '1h' }
    );
    res.status(200).json({
      token
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Something went wrong.'
    });
  }
};