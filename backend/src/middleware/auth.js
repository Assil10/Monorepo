const jwt = require('jsonwebtoken');
const Role = require('../models/Role');
const BlacklistedToken = require('../models/BlacklistedToken');

// Add token to blacklist
exports.blacklistToken = async (token) => {
  try {
    // Get token expiration from JWT payload
    const decoded = jwt.decode(token);
    const expiresAt = decoded && decoded.exp 
      ? new Date(decoded.exp * 1000) 
      : new Date(Date.now() + 24 * 60 * 60 * 1000); // Default 24h
    
    // Store in blacklist
    await BlacklistedToken.create({
      token,
      expiresAt
    });
    
    // Optionally run cleanup of expired tokens (can be moved to a scheduled job)
    await BlacklistedToken.cleanupExpired();
    
    return true;
  } catch (error) {
    console.error('Error blacklisting token:', error);
    return false;
  }
};

// Authentication middleware
exports.authenticate = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }
    
    // Extract token (remove "Bearer " prefix if present)
    const token = authHeader.startsWith('Bearer ') 
      ? authHeader.substring(7) 
      : authHeader;
    
    try {
      // Check if token is blacklisted (logged out)
      const isTokenBlacklisted = await BlacklistedToken.isBlacklisted(token);
      if (isTokenBlacklisted) {
        return res.status(401).json({ message: "Token has been invalidated. Please login again." });
      }
      
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Store full user info in request
      req.user = decoded;
      req.token = token; // Store token for potential use in other middleware
      
      next();
    } catch (tokenError) {
      console.error('Token validation error:', tokenError);
      
      if (tokenError.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: "Invalid token" });
      } else if (tokenError.name === 'TokenExpiredError') {
        return res.status(401).json({ message: "Token expired" });
      } else {
        return res.status(401).json({ message: "Authentication failed", error: tokenError.message });
      }
    }
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Check if user has the required role
const checkRole = async (req, res, next, requiredRole) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    // Get user's role from database
    const role = await Role.findOne({
      where: { id: user.roleId }
    });

    if (!role || role.name !== requiredRole) {
      return res.status(403).json({
        message: `Access denied. ${requiredRole} role required.`
      });
    }

    next();
  } catch (error) {
    console.error('Role check error:', error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Role-based authorization middleware
exports.checkRole = (roles) => {
  return async (req, res, next) => {
    try {
      if (!req.user || !req.user.role) {
        return res.status(403).json({ message: "Access denied: User role not found" });
      }
      
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Access denied: Insufficient privileges" });
      }
      
      next();
    } catch (error) {
      console.error("Role check error:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
};

// Check specific privilege
exports.checkPrivilege = (privilege) => {
  return async (req, res, next) => {
    try {
      if (!req.user || !req.user.userId) {
        return res.status(403).json({ message: "Access denied: User not authenticated" });
      }
      
      // Get user's role and its privileges
      const role = await Role.findOne({ 
        where: { name: req.user.role }
      });
      
      if (!role) {
        return res.status(403).json({ message: "Access denied: Role not found" });
      }
      
      // Get privileges array
      const privileges = role.privileges || [];
      
      // Super admin has all privileges
      if (privileges.includes('all') || privileges.includes(privilege)) {
        return next();
      }
      
      return res.status(403).json({ message: "Access denied: Insufficient privileges" });
    } catch (error) {
      console.error("Privilege check error:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
};

//