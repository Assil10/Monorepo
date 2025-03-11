require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const moment = require('moment');
const User = require('../models/User');
const Role = require('../models/Role');
const { generateOTP } = require('../middleware/otpMiddleware');
const { blacklistToken } = require('../middleware/auth');
const { recordFailedLoginAttempt, resetFailedLoginAttempts } = require('../middleware/loginLimiter');

// Helper: Create and return a nodemailer transporter
const createTransporter = () =>
  nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

// Helper: Send verification email with a rich HTML template
const sendVerificationEmail = async (
  email,
  verificationCode,
  userName,
  userLocation,
  userIp,
  date,
  time
) => {
  try {
    const transporter = createTransporter();

    // Example icons (replace with your own if desired)
    const locationIcon = "https://cdn-icons-png.flaticon.com/512/684/684908.png";
    const ipIcon = "https://cdn-icons-png.flaticon.com/512/841/841364.png";
    const calendarIcon = "https://cdn-icons-png.flaticon.com/512/747/747310.png";
    const timeIcon = "https://cdn-icons-png.flaticon.com/512/2911/2911643.png";

    const emailTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Mail Verification - Korpor</title>
  <style>
    body { margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4; }
    .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 6px; overflow: hidden; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15); }
    .header { background-color: #663399; color: white; padding: 20px; text-align: center; }
    .content { padding: 30px; }
    .verification-code { font-size: 32px; font-weight: bold; letter-spacing: 5px; text-align: center; margin: 30px 0; color: #663399; }
    .meta-row { display: flex; align-items: center; margin-bottom: 12px; }
    .meta-icon { width: 20px; height: 20px; margin-right: 10px; }
    .meta-text { font-size: 14px; color: #555; }
    .divider { height: 1px; background-color: #eee; margin: 20px 0; }
    .footer { text-align: center; padding: 20px; color: #777; font-size: 12px; }
    .cta-button { display: inline-block; background-color: #663399; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Email Verification</h2>
    </div>
    <div class="content">
      <p>Hello ${userName},</p>
      <p>Thank you for signing up! Please use the verification code below to complete your registration:</p>
      
      <div class="verification-code">${verificationCode}</div>
      
      <p>This code will expire in 10 minutes for security reasons.</p>
      
      <div class="divider"></div>
      
      <p>Request details:</p>
      
      <div class="meta-row">
        <img src="${locationIcon}" alt="Location" class="meta-icon" />
        <div class="meta-text">Location: ${userLocation || 'Unknown'}</div>
      </div>
      
      <div class="meta-row">
        <img src="${ipIcon}" alt="IP Address" class="meta-icon" />
        <div class="meta-text">IP Address: ${userIp || 'Unknown'}</div>
      </div>
      
      <div class="meta-row">
        <img src="${calendarIcon}" alt="Date" class="meta-icon" />
        <div class="meta-text">Date: ${date || 'Unknown'}</div>
      </div>
      
      <div class="meta-row">
        <img src="${timeIcon}" alt="Time" class="meta-icon" />
        <div class="meta-text">Time: ${time || 'Unknown'}</div>
      </div>
      
      <div class="divider"></div>
      
      <p>If you did not request this verification code, please ignore this email.</p>
    </div>
    <div class="footer">
      &copy; ${new Date().getFullYear()} Korpor. All rights reserved.
    </div>
  </div>
</body>
</html>
`;

    await transporter.sendMail({
      from: `"Korpor Authentication" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify Your Email Address",
      html: emailTemplate,
    });

    console.log(`Verification email sent to ${email}`);
    return true;
  } catch (error) {
    console.error("Email sending error:", error);
    return false;
  }
};

// Helper: Generate tokens (access and refresh)
const generateTokens = (user) => {
  // Include role name if available
  const role = user.Role ? user.Role.name : null;
  
  // Generate access token - short lived (e.g., 1 hour)
  const accessToken = jwt.sign(
    { 
      userId: user.id, 
      email: user.email, 
      role: role 
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' } // 1 hour
  );
  
  // Generate refresh token - longer lived (e.g., 7 days)
  const refreshToken = jwt.sign(
    { 
      userId: user.id, 
      tokenType: 'refresh' 
    },
    process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
    { expiresIn: '7d' } // 7 days
  );
  
  return { accessToken, refreshToken };
};

// ======================= CORE AUTH ENDPOINTS =======================

/**
 * User Registration
 * Registers a new user and sends verification email
 */
exports.signUp = async (req, res) => {
  try {
    const { name, surname, email, password, birthdate } = req.body;
    
    // Validate inputs
    if (!name || !surname || !email || !password || !birthdate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ 
      where: { email } 
    });
    
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password & generate verification code
    const hashedPassword = await bcrypt.hash(password, 10);
    const { otp: verificationCode, expiry: expiryTime } = generateOTP({ digits: 4, expiryMinutes: 10 });

    // Determine new account number
    const lastUser = await User.findOne({
      order: [['accountNo', 'DESC']]
    });
    const newAccountNo = lastUser && lastUser.accountNo ? lastUser.accountNo + 1 : 1000;

    // Create new user with Sequelize
    const newUser = await User.create({
      accountNo: newAccountNo,
      name,
      surname,
      email,
      password: hashedPassword,
      birthdate,
      isVerified: false,
      resetCode: verificationCode,
      resetCodeExpires: expiryTime,
      approvalStatus: 'pending'
    });

    // Get client info for email
    const date = moment().format('MMMM Do, YYYY');
    const time = moment().format('h:mm A');
    const userIp = req.ip || req.connection.remoteAddress;
    const userLocation = 'Location data unavailable';
    
    // Send verification email
    await sendVerificationEmail(
      email,
      verificationCode,
      name,
      userLocation,
      userIp,
      date,
      time
    );

    res.status(201).json({
      message: "Sign-up request submitted successfully. Check your email for the verification code.",
      accountNo: newUser.accountNo
    });
  } catch (error) {
    console.error("SignUp Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Email Verification
 * Verifies a user's email with the provided code
 */
exports.verifyEmail = async (req, res) => {
  try {
    const { email, code } = req.body;
    
    if (!email || !code) {
      return res.status(400).json({ message: "Email and verification code are required" });
    }

    const user = await User.findOne({ 
      where: { email } 
    });
    
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    
    if (user.isVerified) {
      return res.status(400).json({ message: "Email already verified" });
    }
    
    if (user.resetCode !== code) {
      return res.status(400).json({ message: "Invalid verification code" });
    }
    
    if (new Date() > new Date(user.resetCodeExpires)) {
      return res.status(400).json({ message: "Verification code has expired" });
    }

    // Update user to verified status
    await User.update({
      isVerified: true,
      resetCode: null,
      resetCodeExpires: null,
      approvalStatus: 'approved'  // Auto-approve if no admin approval needed
    }, {
      where: { id: user.id }
    });

    res.json({ message: "Email verified successfully. Your account is now active!" });
  } catch (error) {
    console.error("Verification Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * User Login
 * Authenticates a user and returns tokens
 */
exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ 
      where: { email },
      include: [{ model: Role }]
    });
    
    if (!user) {
      await recordFailedLoginAttempt(email);
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      await recordFailedLoginAttempt(email);
      return res.status(400).json({ message: "Invalid email or password" });
    }

    if (!user.isVerified) {
      return res.status(403).json({ message: "Please verify your email first" });
    }

    if (user.approvalStatus !== 'approved') {
      return res.status(403).json({ message: "Your account is not approved yet" });
    }

    // Reset failed login attempts on successful login
    await resetFailedLoginAttempts(email);
    
    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user);
    
    // Store refresh token in DB
    const refreshExpiry = new Date();
    refreshExpiry.setDate(refreshExpiry.getDate() + 7); // 7 days from now
    
    await User.update({
      refreshToken: refreshToken,
      refreshTokenExpires: refreshExpiry,
      lastLogin: new Date()
    }, {
      where: { id: user.id }
    });
    
    // Return success with tokens and basic user info
    res.json({
      message: "Sign-in successful",
      accessToken,
      refreshToken,
      user: {
        accountNo: user.accountNo,
        name: user.name,
        surname: user.surname,
        email: user.email,
        profilePicture: user.profilePicture || ""
      }
    });
  } catch (error) {
    console.error("SignIn Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Token Refresh
 * Issues a new access token using a valid refresh token
 */
exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token is required" });
    }
    
    // Verify the refresh token
    let decoded;
    try {
      decoded = jwt.verify(
        refreshToken, 
        process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET
      );
    } catch (error) {
      return res.status(401).json({ message: "Invalid or expired refresh token" });
    }
    
    // Find the user with this refresh token
    const user = await User.findOne({ 
      where: { refreshToken },
      include: [{ model: Role }]
    });
    
    if (!user) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }
    
    // Check if refresh token is expired in our database
    if (new Date() > new Date(user.refreshTokenExpires)) {
      return res.status(401).json({ message: "Refresh token has expired" });
    }
    
    // Generate new access token (but keep the same refresh token)
    const accessToken = jwt.sign(
      { 
        userId: user.id, 
        email: user.email, 
        role: user.Role ? user.Role.name : null
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    res.json({
      message: "Token refreshed successfully",
      accessToken
    });
  } catch (error) {
    console.error("RefreshToken Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Logout
 * Invalidates the current access token and removes refresh token
 */
exports.logout = async (req, res) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(400).json({ message: "No token provided" });
    }
    
    const token = authHeader.replace('Bearer ', '');
    
    // Blacklist the current access token
    await blacklistToken(token);
    
    // Get user ID from token
    const decoded = jwt.decode(token);
    const userId = decoded?.userId;
    
    if (userId) {
      // Clear refresh token in database
      await User.update({
        refreshToken: null,
        refreshTokenExpires: null
      }, {
        where: { id: userId }
      });
    }
    
    res.json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Validate Token
 * Checks if the provided token is valid
 */
exports.validateToken = async (req, res) => {
  // If we get here, the token is valid (thanks to authenticate middleware)
  res.json({ 
    valid: true,
    user: req.user 
  });
};

/**
 * Forgot Password
 * Sends a password reset code to the user's email
 */
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    
    const user = await User.findOne({ 
      where: { email } 
    });
    
    if (!user) {
      // Don't reveal that the user doesn't exist for security reasons
      return res.status(200).json({ message: "If your email exists in our system, you will receive a password reset code." });
    }
    
    // Generate reset code that expires in 1 hour
    const { otp: resetCode, expiry } = generateOTP({ digits: 6, expiryMinutes: 60 });
    
    // Update user with reset code
    await User.update({
      resetCode: resetCode,
      resetCodeExpires: expiry
    }, {
      where: { id: user.id }
    });
    
    // Get client info for email
    const date = moment().format('MMMM Do, YYYY');
    const time = moment().format('h:mm A');
    const userIp = req.ip || req.connection.remoteAddress;
    const userLocation = 'Location data unavailable';
    
    // Send password reset email
    await sendVerificationEmail(
      email,
      resetCode,
      user.name,
      userLocation,
      userIp,
      date,
      time
    );
    
    res.json({ message: "If your email exists in our system, you will receive a password reset code." });
  } catch (error) {
    console.error("ForgotPassword Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Reset Password
 * Resets a user's password using the reset code
 */
exports.resetPassword = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;
    
    if (!email || !code || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }
    
    const user = await User.findOne({ 
      where: { email } 
    });
    
    if (!user || user.resetCode !== code) {
      return res.status(400).json({ message: "Invalid or expired verification code" });
    }
    
    if (new Date() > new Date(user.resetCodeExpires)) {
      return res.status(400).json({ message: "Verification code has expired" });
    }
    
    // Update password and clear reset code
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.update({
      password: hashedPassword,
      resetCode: null,
      resetCodeExpires: null
    }, {
      where: { id: user.id }
    });
    
    res.json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("ResetPassword Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
