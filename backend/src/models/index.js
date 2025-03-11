const { sequelize } = require('../config/db.config');
const User = require('./User');
const Role = require('./Role');
const BlacklistedToken = require('./BlacklistedToken');

// Define relationships between models
Role.hasMany(User, { foreignKey: 'roleId' });
User.belongsTo(Role, { foreignKey: 'roleId' });

// Function to sync all models with database
const syncModels = async (force = false) => {
  try {
    await sequelize.sync({ force });
    console.log('Database models synchronized successfully.');
  } catch (error) {
    console.error('Error synchronizing database models:', error);
    throw error;
  }
};

// Export models and sequelize instance
module.exports = {
  sequelize,
  syncModels,
  User,
  Role,
  BlacklistedToken
}; 