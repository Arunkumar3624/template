const express = require('express');
const { register, login } = require('../controllers/authController');
const { registerRules, loginRules, handleValidation } = require('../middleware/validators');
const { authLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

router.post('/register', authLimiter, registerRules, handleValidation, register);
router.post('/login', authLimiter, loginRules, handleValidation, login);

module.exports = router;
