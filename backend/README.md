# Korpor Node.js Backend - Crafted with Love by Assil Khaldi ☕ and changed by ahmed .

This repository contains a Node.js Express backend that provides authentication, user management, and role-based access control.
It also integrates with Cloudinary for image uploads and includes Swagger for API documentation.

## Database Migration Notice,,,

**IMPORTANT**: This backend has been migrated from MongoDB to MySQL. For detailed MySQL setup instructions, refer to the [MySQL Migration Guide](./README-MYSQL.md).

## Table of Contents :

1. [Project Structure](#project-structure)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Environment Variables](#environment-variables)
5. [Running the Server](#running-the-server)
6. [API Endpoints](#api-endpoints)
7. [Using the API from a Frontend](#using-the-api-from-a-frontend)
8. [Swagger API Documentation](#swagger-api-documentation)
9. [MySQL Migration](#mysql-migration)
10. [Additional Notes](#additional-notes)

---

## Project Structure

=======

- **src/**

  - **controllers/**

    - `adminController.js`
    - `roleController.js`
    - `authController.js`
    - `userController.js`

  - **middleware/**

    - `auth.js`
    - `loginLimiter.js`
    - `otpMiddleware.js`

  - **models/**

    - `Role.js`
    - `User.js`
    - `BlacklistedToken.js`
    - `index.js`

  - **config/**

    - `db.config.js`

  - **routes/**

    - `adminRoutes.js`
    - `authRoutes.js`.
    - `roleRoutes.js`
    - `userRoutes.js`

- **swaggerConfig.js**
- **server.js**
- **.env**
- **db_setup.sql**
- **auth-test.js**
- **.gitignore**
- **package.json**
- **package-lock.json**
- **README.md**
- **README-MYSQL.md**

---

- **controllers/**: Contains the business logic for each resource (admin, auth, roles, users, etc.).
- **middleware/**: Houses middleware for authentication, rate limiting, and OTP generation.
- **models/**: Sequelize models for `User`, `Role`, and `BlacklistedToken`.
- **config/**: Database configuration for MySQL/Sequelize.
- **routes/**: Defines the Express routes for each resource.
- **swaggerConfig.js**: Sets up Swagger documentation.
- **server.js**: Entry point of the application (starts the Express server).
- **db_setup.sql**: SQL script for setting up the MySQL database.
- **auth-test.js**: Test script for the authentication flow.

---

## Prerequisites

- **Node.js**: v16+ (or v18+) recommended.
- **npm**: v8+ recommended (usually comes with Node.js).
- **MySQL**: MySQL 5.7+ or 8.0+ (XAMPP includes MySQL)
- **Cloudinary Account**: For handling profile picture uploads

You will also need to create a `.env` file in the root of the project with your environment variables (details in [Environment Variables](#environment-variables) section).

---

## Installation

1. **Clone the repository** (or download it)

   ```bash



   git clone https://github.com/Assil10/korpor-back/

   cd your-repo
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up MySQL database**

   ```bash
   # Option 1: Using phpMyAdmin
   # Import db_setup.sql

   # Option 2: Using command line
   mysql -u root -p < db_setup.sql
   ```

## Environment Variables

Create a `.env` file in the root directory with these variables:

```
# MySQL Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=korpor_dev
DB_PORT=3306

# Server Configuration
PORT=5000

# Email Configuration
EMAIL_USER=your_email_username
EMAIL_PASS=your_email_password

# JWT Configuration
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_token_secret

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Environment
NODE_ENV=development
```

## Running the Server

```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Endpoints

### Authentication (/api/auth)

- **POST /api/auth/sign-up**: Register a new user.

  - Body: `{ name, surname, email, password, birthdate }`
  - Enhanced to handle re-registration attempts with unverified emails

- **POST /api/auth/verify-email**: Verify user's email with code.

  - Body: `{ email, code }`

- **POST /api/auth/resend-verification**: Request a new verification code for unverified accounts.

  - Body: `{ email }`
  - Useful if the original code expired or was lost

- **POST /api/auth/sign-in**: Login for approved users.

  - Body: `{ email, password }`

- **POST /api/auth/refresh-token**: Get new access token.

  - Body: `{ refreshToken }`

- **POST /api/auth/logout**: Invalidate tokens and log out.

  - Header: `Authorization: Bearer <token>`

- **GET /api/auth/validate-token**: Check if token is valid.

  - Header: `Authorization: Bearer <token>`

- **POST /api/auth/forgot-password**: Request password reset.

  - Body: `{ email }`

- **POST /api/auth/reset-password**: Reset the user's password.

  - Body: `{ email, code, newPassword }`

### User (/api/user)

- **GET /api/user/profile**: Retrieve the authenticated user's profile.
- **POST /api/user/upload-profile-picture**: Upload or update the user's profile picture.

  - Form Data: `profilePicture` (binary file)

### Admin (/api/admin)

- **GET /api/admin/registration-requests**: Retrieve pending registration requests.
- **POST /api/admin/approve-user/:id**: Approve a user registration and assign a role.

  - Body: `{ role }`

- **POST /api/admin/reject-user/:id**: Reject a user registration.
- **GET /api/admin/users**: Retrieve all users.
- **GET /api/admin/users/:id**: Retrieve a specific user's details.
- **POST /api/admin/users**: Create a new user directly (approved).

  - Body: `{ name, surname, email, password, birthdate, role }`

- **PUT /api/admin/users/:id**: Update a user's details.
- **DELETE /api/admin/users/:id**: Delete a user.

### Role Management (/api/roles)

- **GET /api/roles**: Retrieve all roles.
- **GET /api/roles/:id**: Retrieve a specific role by its ID.
- **POST /api/roles**: Create a new role.

  - Body: `{ name, privileges }`

- **PUT /api/roles/:id**: Update an existing role.
- **DELETE /api/roles/:id**: Delete a role.

## Using the API from a Frontend

The backend exposes a RESTful API. Frontend developers can interact with it by sending HTTP requests
to the endpoints described above. Make sure to include the JWT token in the Authorization header for protected routes:

```
Authorization: Bearer <your-jwt-token>
```

## Swagger API Documentation

The project uses Swagger for API documentation. Once the server is running, you can view the interactive documentation at:

```
http://localhost:5000/api-docs
```

## MySQL Migration

This project has been migrated from MongoDB to MySQL/Sequelize. Key changes include:

- Replaced Mongoose schemas with Sequelize models
- Implemented relational database structure with foreign keys
- Added token blacklisting with database storage
- Enhanced security with rate limiting and account lockout

For complete setup and migration instructions, please refer to the [MySQL Migration Guide](./README-MYSQL.md).

## Testing the Authentication Flow

A comprehensive test script is included to verify the authentication flow:

```bash
node auth-test.js
```

This script tests:

- User registration
- Email verification
- Login
- Token validation
- Token refresh
- Password reset
- Logout

## Additional Notes

- **Authentication Middleware**:
  The middleware in src/middleware/auth.js handles JWT verification and role/privilege checks.
- **Cloudinary Integration**:
  Cloudinary is used for handling image uploads. The configuration is set in src/server.js and used in userController.js.
- **Role Initialization**:
  Default roles are initialized automatically when the server starts (via the initializeDefaultRoles function in src/controllers/roleController.js).
- **Error Handling**:
  The API returns standardized error messages and HTTP status codes for easier debugging and integration.
- **Contributing**:
  Pull requests, issues, and feature requests are welcome. Please follow the existing code style and document your changes.

---

_Assle made with love ❤️, Ahmed edited with hate 😠_
