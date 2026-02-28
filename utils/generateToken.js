const jwt = require('jsonwebtoken');

/**
 * Generate a signed JWT for a given user ID.
 * Token expires in 1 hour as required.
 */
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

module.exports = { generateToken };
