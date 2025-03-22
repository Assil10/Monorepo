const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { authenticate, checkRole } = require("../middleware/auth");

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         account_no:
 *           type: integer
 *         name:
 *           type: string
 *         surname:
 *           type: string
 *         email:
 *           type: string
 *         birthdate:
 *           type: string
 *           format: date
 *         is_verified:
 *           type: boolean
 *         role_id:
 *           type: integer
 *         approval_status:
 *           type: string
 *           enum: [unverified, pending, approved, rejected]
 *         profile_picture:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *         role_name:
 *           type: string
 *         privileges:
 *           type: array
 *           items:
 *             type: string
 *
 *     PaginatedResponse:
 *       type: object
 *       properties:
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/User'
 *         pagination:
 *           type: object
 *           properties:
 *             total:
 *               type: integer
 *             pages:
 *               type: integer
 *             currentPage:
 *               type: integer
 *             limit:
 *               type: integer
 */

/**
 * @swagger
 * /api/admin/registration-requests:
 *   get:
 *     summary: Get pending registration requests
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of pending users.
 */
router.get(
  "/registration-requests",
  authenticate,
  checkRole(["admin", "super admin"]),
  adminController.getRegistrationRequests,
);

/**
 * @swagger
 * /api/admin/approve-user/{id}:
 *   post:
 *     summary: Approve a user for registration
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to approve.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [user, admin, super admin]
 *     responses:
 *       200:
 *         description: User approved successfully.
 *       400:
 *         description: Invalid role or user already processed.
 */
router.post(
  "/approve-user/:id",
  authenticate,
  checkRole(["admin", "super admin"]),
  adminController.approveUser,
);

/**
 * @swagger
 * /api/admin/reject-user/{id}:
 *   post:
 *     summary: Reject a user for registration
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to reject.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User rejected successfully.
 *       400:
 *         description: User already processed.
 */
router.post(
  "/reject-user/:id",
  authenticate,
  checkRole(["admin", "super admin"]),
  adminController.rejectUser,
);

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Get all users with pagination and filters
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [unverified, pending, approved, rejected]
 *         description: Filter by approval status
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search in name, surname, email, or account number
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           default: created_at
 *         description: Field to sort by
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Sort order
 *     responses:
 *       200:
 *         description: List of users with pagination
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedResponse'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Not a super admin
 *       500:
 *         description: Server error
 *
 * /api/admin/users/{userId}/approval:
 *   patch:
 *     summary: Update user approval status and role
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, approved, rejected]
 *               roleId:
 *                 type: integer
 *                 description: Required when status is 'approved'
 *     responses:
 *       200:
 *         description: User status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Not a super admin
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.get(
  "/users",
  authenticate,
  checkRole(["admin", "super admin"]),
  adminController.getAllUsers,
);

/**
 * @swagger
 * /api/admin/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found.
 *       404:
 *         description: User not found.
 */
router.get(
  "/users/:id",
  authenticate,
  checkRole(["admin", "super admin"]),
  adminController.getUserById,
);

/**
 * @swagger
 * /api/admin/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
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
 *               role:
 *                 type: string
 *                 enum: [user, admin, super admin]
 *     responses:
 *       201:
 *         description: User created successfully.
 *       400:
 *         description: Invalid input data.
 */
router.post(
  "/users",
  authenticate,
  checkRole(["admin", "super admin"]),
  adminController.createUser,
);

/**
 * @swagger
 * /api/admin/users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
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
 *               role:
 *                 type: string
 *                 enum: [user, admin, super admin]
 *               approvalStatus:
 *                 type: string
 *                 enum: [pending, approved, rejected]
 *     responses:
 *       200:
 *         description: User updated successfully.
 *       404:
 *         description: User not found.
 */
router.put(
  "/users/:id",
  authenticate,
  checkRole(["admin", "super admin"]),
  adminController.updateUser,
);

/**
 * @swagger
 * /api/admin/users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *       404:
 *         description: User not found.
 */
router.delete(
  "/users/:id",
  authenticate,
  checkRole(["admin", "super admin"]),
  adminController.deleteUser,
);

module.exports = router;
