const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// No business logic here — routes only map URLs to controller functions
router.post('/register', register);
router.post('/login', login);

module.exports = router;
