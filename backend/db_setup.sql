-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS korpor_dev;
USE korpor_dev;

-- Create roles table
CREATE TABLE IF NOT EXISTS roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  privileges JSON,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  account_no INT UNIQUE,
  name VARCHAR(100) NOT NULL,
  surname VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  birthdate DATE,
  reset_code VARCHAR(10),
  reset_code_expires DATETIME,
  is_verified BOOLEAN DEFAULT FALSE,
  role_id INT,
  approval_status ENUM('unverified', 'pending', 'approved', 'rejected') DEFAULT 'unverified',
  profile_picture VARCHAR(255) DEFAULT '',
  cloudinary_public_id VARCHAR(255) DEFAULT '',
  expired BOOLEAN DEFAULT FALSE,
  failed_login_attempts INT DEFAULT 0,
  locked_until DATETIME,
  last_login DATETIME,
  refresh_token VARCHAR(500),
  refresh_token_expires DATETIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL
);

-- Create blacklisted_tokens table (for logout functionality)
CREATE TABLE IF NOT EXISTS blacklisted_tokens (
  id INT AUTO_INCREMENT PRIMARY KEY,
  token VARCHAR(500) NOT NULL,
  expires_at DATETIME NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default roles
INSERT INTO roles (name, privileges, description) VALUES
('super admin', JSON_ARRAY('all'), 'Super administrator with all privileges'),
('admin', JSON_ARRAY('users_read', 'users_write', 'content_read', 'content_write'), 'Administrator with limited privileges'),
('user', JSON_ARRAY('content_read'), 'Standard user');

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_approval_status ON users(approval_status);
CREATE INDEX idx_token_blacklist ON blacklisted_tokens(token(255));
CREATE INDEX idx_token_expires ON blacklisted_tokens(expires_at); 