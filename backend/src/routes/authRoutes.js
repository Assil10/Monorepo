const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { authenticate } = require("../middleware/auth");
const {
  authLimiter,
  handleFailedLogin,
} = require("../middleware/loginLimiter");

// Apply rate limiting to all authentication routes
router.use(authLimiter);

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - surname
 *         - email
 *         - password
 *       properties:
 *         accountNo:
 *           type: integer
 *           description: The auto-generated account number
 *         name:
 *           type: string
 *           description: User's first name
 *         surname:
 *           type: string
 *           description: User's last name
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *         password:
 *           type: string
 *           format: password
 *           description: User's password (will be hashed)
 *         birthdate:
 *           type: string
 *           format: date
 *           description: User's date of birth
 *         profilePicture:
 *           type: string
 *           description: URL to the user's profile picture
 *         isVerified:
 *           type: boolean
 *           description: Whether the email is verified
 *         approvalStatus:
 *           type: string
 *           enum: [pending, approved, rejected]
 *           description: Admin approval status
 *       example:
 *         name: John
 *         surname: Doe
 *         email: john.doe@example.com
 *         password: SecurePassword123!
 *         birthdate: 1990-01-01
 *
 *     AuthResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         accessToken:
 *           type: string
 *         refreshToken:
 *           type: string
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *             accountNo:
 *               type: integer
 *             email:
 *               type: string
 *             role:
 *               type: string
 *             approval_status:
 *               type: string
 *               enum: [unverified, pending, approved, rejected]
 *             privileges:
 *               type: array
 *               items:
 *                 type: string
 *
 *     SignUpResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         status:
 *           type: string
 *           enum: [pending]
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *             email:
 *               type: string
 *             approval_status:
 *               type: string
 *               enum: [pending]
 *
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       description: Enter JWT token in the format 'Bearer {token}'
 *
 * tags:
 *   - name: Authentication
 *     description: User authentication operations
 */

/**
 * @swagger
 * /api/auth/sign-up:
 *   post:
 *     summary: Register new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - surname
 *               - email
 *               - password
 *               - birthdate
 *             properties:
 *               name:
 *                 type: string
 *               surname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               birthdate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Registration successful - Waiting for admin approval
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SignUpResponse'
 *       400:
 *         description: Invalid input
 *       409:
 *         description: Email already exists
 *       500:
 *         description: Server error
 */
router.post("/sign-up", authController.signUp);

/**
 * @swagger
 * /api/auth/verify-email:
 *   post:
 *     summary: Verify email address
 *     description: Verify a user's email address using the verification code sent during registration. This must be completed before the user can sign in.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - code
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john.doe@example.com
 *               code:
 *                 type: string
 *                 example: 1234
 *     responses:
 *       200:
 *         description: Email verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Email verified successfully. Your account is now active!
 *       400:
 *         description: Invalid or expired verification code
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid verification code
 *       500:
 *         description: Server error
 */
router.post("/verify-email", authController.verifyEmail);

/**
 * @swagger
 * /api/auth/sign-in:
 *   post:
 *     summary: Sign in user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               rememberMe:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Sign in successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       401:
 *         description: Invalid credentials
 *       403:
 *         description: Account pending approval or rejected
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 status:
 *                   type: string
 *                   enum: [pending, rejected]
 *       500:
 *         description: Server error
 */
router.post("/sign-in", handleFailedLogin, authController.signIn);

/**
 * @swagger
 * /api/auth/refresh-token:
 *   post:
 *     summary: Refresh access token
 *     description: Get a new access token using a valid refresh token. This extends the user's session without requiring them to sign in again.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Token refreshed successfully
 *                 accessToken:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Refresh token is required
 *       401:
 *         description: Invalid or expired refresh token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid or expired refresh token
 *       500:
 *         description: Server error
 */
router.post("/refresh-token", authController.refreshToken);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Log out a user
 *     description: Invalidate the user's access token and remove their refresh token from the database.
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Logout successful
 *       400:
 *         description: No token provided
 *       401:
 *         description: Invalid token
 *       500:
 *         description: Server error
 */
router.post("/logout", authController.logout);

/**
 * @swagger
 * /api/auth/validate-token:
 *   get:
 *     summary: Validate access token
 *     description: Check if the provided JWT access token is valid and return the associated user information.
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token is valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 valid:
 *                   type: boolean
 *                   example: true
 *                 user:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                       example: 60d5f8b74c85e1246c7bb8bf
 *                     email:
 *                       type: string
 *                       example: john.doe@example.com
 *                     role:
 *                       type: string
 *                       example: user
 *       401:
 *         description: Invalid or expired token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Access denied. No token provided.
 *       500:
 *         description: Server error
 */
router.get("/validate-token", authenticate, authController.validateToken);

/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     summary: Request password reset
 *     description: Send a password reset code to the user's email to initiate the password recovery process.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john.doe@example.com
 *     responses:
 *       200:
 *         description: Reset code sent (for security, this response is the same whether the email exists or not)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: If your email exists in our system, you will receive a password reset code.
 *       400:
 *         description: Email is required
 *       500:
 *         description: Server error
 */
router.post("/forgot-password", authController.forgotPassword);

/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     summary: Reset password
 *     description: Set a new password using the verification code sent to the user's email.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - code
 *               - newPassword
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john.doe@example.com
 *               code:
 *                 type: string
 *                 example: 123456
 *               newPassword:
 *                 type: string
 *                 format: password
 *                 example: NewSecurePassword456!
 *     responses:
 *       200:
 *         description: Password reset successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password reset successfully
 *       400:
 *         description: Invalid or expired verification code
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid or expired verification code
 *       500:
 *         description: Server error
 */
router.post("/reset-password", authController.resetPassword);

/**
 * @swagger
 * /api/auth/resend-verification:
 *   post:
 *     summary: Resend verification code
 *     description: Request a new verification code for an unverified account. This is useful if the original code expired or was lost.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john.doe@example.com
 *     responses:
 *       200:
 *         description: Verification code resent (for security, this response is the same whether the email exists or not)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: If your email is registered, a new verification code has been sent.
 *       400:
 *         description: Account already verified or email is required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: This account is already verified. Please sign in instead.
 *       500:
 *         description: Server error
 */
router.post("/resend-verification", authController.resendVerificationCode);

module.exports = router;
