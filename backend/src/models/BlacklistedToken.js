const { DataTypes, Op } = require('sequelize');
const { sequelize } = require('../config/db.config');

const BlacklistedToken = sequelize.define('BlacklistedToken', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  token: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'expires_at'
  }
}, {
  tableName: 'blacklisted_tokens',
  timestamps: true,
  updatedAt: false, // We only need createdAt for this model
  underscored: true
});

// Method to check if a token is blacklisted
BlacklistedToken.isBlacklisted = async (token) => {
  const count = await BlacklistedToken.count({
    where: {
      token,
      expiresAt: {
        [Op.gt]: new Date() // Only check unexpired tokens
      }
    }
  });
  return count > 0;
};

// Method to clean up expired tokens
BlacklistedToken.cleanupExpired = async () => {
  return await BlacklistedToken.destroy({
    where: {
      expiresAt: {
        [Op.lt]: new Date() // Delete expired tokens
      }
    }
  });
};

module.exports = BlacklistedToken; 