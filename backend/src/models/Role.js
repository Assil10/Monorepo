const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.config');

const Role = sequelize.define('Role', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  privileges: {
    type: DataTypes.JSON,
    allowNull: true,
    get() {
      const value = this.getDataValue('privileges');
      return value ? value : [];
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'roles',
  timestamps: true,
  underscored: true
});

module.exports = Role;
