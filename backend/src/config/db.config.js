require("dotenv").config();
const { Sequelize } = require("sequelize");

// Get database credentials from environment variables or use defaults
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_USER = process.env.DB_USER || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "";
const DB_NAME = process.env.DB_NAME || "korpor_dev";
const DB_PORT = process.env.DB_PORT || 3306;
// Read the instance connection name for Cloud SQL socket connection
const INSTANCE_CONNECTION_NAME = process.env.INSTANCE_CONNECTION_NAME;

// Determine connection options based on environment
const options = {
  dialect: "mysql",
  logging: process.env.NODE_ENV === "development" ? console.log : false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    underscored: true, // Use snake_case instead of camelCase for column names
    timestamps: true, // Add createdAt and updatedAt columns
    paranoid: false, // Don't use soft deletes
  },
};

// If INSTANCE_CONNECTION_NAME is set (running in Cloud Run with SQL connection)
if (INSTANCE_CONNECTION_NAME) {
  options.dialectOptions = {
    socketPath: `/cloudsql/${INSTANCE_CONNECTION_NAME}`,
  };
} else {
  // Otherwise (local development or other environments), use host and port
  options.host = DB_HOST;
  options.port = DB_PORT;
}

// Initialize Sequelize with database connection options
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, options);

// Test the connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    throw error;
  }
};

module.exports = {
  sequelize,
  testConnection,
};
