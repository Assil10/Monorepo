const rateLimit = require('express-rate-limit');
const { User } = require('../models');
const { Op } = require('sequelize');

// Maximum number of failed attempts before account lockout
const MAX_FAILED_ATTEMPTS = 5;
// Lockout duration in milliseconds (15 minutes)
const LOCKOUT_DURATION = 15 * 60 * 1000;

// Rate limiter for authentication routes
exports.authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 authentication requests per 15 minutes
  message: 'Too many authentication attempts from this IP, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
});

// Middleware to check and handle failed login attempts
exports.handleFailedLogin = async (req, res, next) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }
  
  try {
    // Check if user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      // Don't reveal that the user doesn't exist for security reasons
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    
    // Check if account is locked
    if (user.lockedUntil && new Date(user.lockedUntil) > new Date()) {
      const remainingTime = Math.ceil((new Date(user.lockedUntil) - new Date()) / 60000); // in minutes
      return res.status(429).json({
        message: `Account locked due to too many failed attempts. Try again in ${remainingTime} minutes.`,
      });
    }
    
    // Allow login attempt to proceed
    next();
  } catch (error) {
    console.error('Error in login limiter:', error);
    next(error);
  }
};

// Function to record a failed login attempt
exports.recordFailedLoginAttempt = async (email) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return;
    
    // Increment failed attempts
    const newFailedAttempts = (user.failedLoginAttempts || 0) + 1;
    
    // If user has reached max failed attempts, lock the account
    if (newFailedAttempts >= MAX_FAILED_ATTEMPTS) {
      const lockedUntil = new Date(Date.now() + LOCKOUT_DURATION);
      
      await User.update(
        { 
          failedLoginAttempts: 0, // Reset counter
          lockedUntil: lockedUntil 
        },
        { where: { email } }
      );
      
      console.log(`Account ${email} locked until ${lockedUntil}`);
    } else {
      // Just increment the failed attempt counter
      await User.update(
        { failedLoginAttempts: newFailedAttempts },
        { where: { email } }
      );
    }
  } catch (error) {
    console.error('Error recording failed login attempt:', error);
  }
};

// Function to reset failed login attempts after successful login
exports.resetFailedLoginAttempts = async (email) => {
  try {
    await User.update(
      { 
        failedLoginAttempts: 0,
        lockedUntil: null
      },
      { where: { email } }
    );
  } catch (error) {
    console.error('Error resetting failed login attempts:', error);
  }
}; 