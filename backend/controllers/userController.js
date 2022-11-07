const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Container for user controller
const controller = {};

/**
 * @route POST /api/users
 * @desc Register a user
 * @access Public
 */
controller.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ msg: 'User already exists' });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create User
    const user = await User.create({ name, email, password: hashedPassword });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: genrateToken(user._id),
      });
    } else {
      res.status(400).json({ msg: 'Invalid user data' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ msg: 'Server Error' });
  }
};

/**
 * @route POST /api/users/login
 * @desc Login user & get token
 * @access Public
 */
controller.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      return res.status(400).json({ msg: 'Please add all fields' });

    const user = await User.findOne({ email });
    let isValidPassword = false;

    if (user) {
      isValidPassword = await bcrypt.compare(password, user.password);
    }

    if (user && isValidPassword) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: genrateToken(user._id),
      });
    } else {
      res.status(400).json({ msg: 'Invalid credentials' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ msg: 'Server Error' });
  }
};

/**
 * @route GET /api/users/me
 * @desc Get logged in user
 * @access Private
 */
controller.getMe = async (req, res) => {
  res.status(200).json(req.user);
};

// Generate JWT
const genrateToken = id =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

module.exports = controller;
