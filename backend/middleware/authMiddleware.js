const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (err) {
      console.error(err.message);
      res.status(401).json({ msg: 'Not authorised' });
    }
  }
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
};

module.exports = protect;
