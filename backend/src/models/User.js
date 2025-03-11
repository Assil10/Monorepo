const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.config');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  accountNo: {
    type: DataTypes.INTEGER,
    unique: true,
    field: 'account_no'
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  surname: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  birthdate: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  resetCode: {
    type: DataTypes.STRING(10),
    allowNull: true,
    field: 'reset_code'
  },
  resetCodeExpires: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'reset_code_expires'
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_verified'
  },
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'role_id'
  },
  approvalStatus: {
    type: DataTypes.ENUM('unverified', 'pending', 'approved', 'rejected'),
    defaultValue: 'unverified',
    field: 'approval_status'
  },
  profilePicture: {
    type: DataTypes.STRING(255),
    defaultValue: '',
    field: 'profile_picture'
  },
  cloudinaryPublicId: {
    type: DataTypes.STRING(255),
    defaultValue: '',
    field: 'cloudinary_public_id'
  },
  expired: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  failedLoginAttempts: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'failed_login_attempts'
  },
  lockedUntil: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'locked_until'
  },
  lastLogin: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'last_login'
  },
  refreshToken: {
    type: DataTypes.STRING(500),
    allowNull: true,
    field: 'refresh_token'
  },
  refreshTokenExpires: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'refresh_token_expires'
  }
}, {
  tableName: 'users',
  timestamps: true,
  underscored: true // Use snake_case for columns
});

module.exports = User;
