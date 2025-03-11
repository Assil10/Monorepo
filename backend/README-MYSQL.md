# MySQL Database Migration Guide

This guide explains how to set up and migrate the backend from MongoDB to MySQL.

## Prerequisites

1. MySQL Server (5.7+ or 8.0 recommended) - [XAMPP](https://www.apachefriends.org/download.html) includes MySQL
2. Node.js (14+ recommended)
3. NPM or Yarn

## Setup Steps

### 1. Start MySQL Server

- If using XAMPP: Start the MySQL service from the XAMPP Control Panel

### 2. Create the Database

**Option 1: Using the SQL Script**

- Open your MySQL client (e.g., MySQL Workbench, phpMyAdmin from XAMPP)
- Run the SQL script from `db_setup.sql`

**Option 2: Using Command Line**

```bash
mysql -u root -p < db_setup.sql
```

### 3. Install Dependencies

```bash
npm install mysql2 sequelize
```

### 4. Update Environment Variables

Make sure your `.env` file has the correct MySQL connection details:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=korpor_dev
DB_PORT=3306
```

### 5. Start the Application

```bash
npm start
```

## Database Migration Notes

- The migration replaces MongoDB/Mongoose with MySQL/Sequelize
- User authentication functionality remains the same
- All security features have been preserved

## Database Architecture

### Entity Relationship Diagram

```
┌─────────┐       ┌──────┐       ┌───────────────────┐
│  users  │       │ roles│       │ blacklisted_tokens│
├─────────┤       ├──────┤       ├───────────────────┤
│ id      │       │ id   │       │ id                │
│ name    │◄──┐   │ name │       │ token             │
│ email   │   └───┤ role_id      │ expires_at        │
│ ...     │       │ ...  │       └───────────────────┘
└─────────┘       └──────┘
```

### Tables Overview

1. **users** - Stores user account information

   - Contains user credentials, profile data, and authentication details
   - Stores failed login attempts and account lockout information
   - Maintains refresh token data

2. **roles** - Defines user roles and permissions

   - Maps roles to their respective privileges
   - Used for role-based access control

3. **blacklisted_tokens** - Manages revoked tokens
   - Stores invalidated access tokens (from logout)
   - Includes token expiry information for automatic cleanup

## Authentication Flow

1. **Registration**: User signs up and receives a verification code
2. **Email Verification**: User verifies email with the code
3. **Login**: User receives access and refresh tokens
4. **Access Protected Resources**: Using the access token
5. **Token Refresh**: Exchange refresh token for a new access token
6. **Logout**: Invalidate tokens

## Security Features

- **Token Blacklisting**: Invalidates tokens immediately after logout
- **Account Lockout**: Temporarily locks accounts after multiple failed login attempts
- **Password Reset**: Secure password recovery flow with verification codes
- **Role-Based Access**: Different permission levels based on user roles
- **Rate Limiting**: Prevents brute force attacks
- **Input Sanitization**: Protects against SQL injection

## API Testing

The repository includes a comprehensive test script (`auth-test.js`) that validates the entire authentication flow:

```bash
node auth-test.js
```

## Troubleshooting

### Connection Issues

- Verify MySQL is running
- Check hostname, port, username and password in .env file
- Ensure the database exists: `CREATE DATABASE IF NOT EXISTS korpor_dev;`

### Permission Issues

- Make sure your MySQL user has appropriate permissions:

```sql
GRANT ALL PRIVILEGES ON korpor_dev.* TO 'your_username'@'localhost';
FLUSH PRIVILEGES;
```

### Schema Sync Issues

If you need to recreate all tables, set the `force` parameter to true in the `syncModels` function. **WARNING: This will delete all data!**

```javascript
// In server.js
await syncModels(true); // CAUTION: This drops and recreates all tables
```

## Swagger Documentation

API documentation is available at:

```
http://localhost:5000/api-docs
```

The documentation provides a complete reference for all endpoints, including request/response formats and examples.

---

_Assle made with love ❤️, Ahmed edited with hate 😠_
