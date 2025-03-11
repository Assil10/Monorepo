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

## Tables Overview

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