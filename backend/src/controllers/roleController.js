const Role = require('../models/Role');

exports.initializeDefaultRoles = async () => {
  try {
    const defaultRoles = [
      { name: "super admin", privileges: ["create_user", "delete_user", "update_user", "manage_roles"] },
      { name: "admin", privileges: ["create_user", "delete_user", "update_user"] },
      { name: "user", privileges: [] }
    ];
    for (const roleData of defaultRoles) {
      const exists = await Role.findOne({ 
        where: { name: roleData.name }
      });
      if (!exists) {
        await Role.create(roleData);
        console.log(`Role "${roleData.name}" created.`);
      }
    }
  } catch (error) {
    console.error('Error initializing default roles:', error);
  }
};

exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getRoleById = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role) return res.status(404).json({ message: "Role not found" });
    res.json(role);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.createRole = async (req, res) => {
  try {
    const { name, privileges } = req.body;
    if (!name) return res.status(400).json({ message: "Role name is required" });
    const newRole = new Role({ name, privileges });
    await newRole.save();
    res.status(201).json({ message: "Role created successfully", role: newRole });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.updateRole = async (req, res) => {
  try {
    await Role.update(req.body, {
      where: { id: req.params.id }
    });
    
    const role = await Role.findByPk(req.params.id);
    if (!role) {
      return res.status(404).json({
        success: false,
        error: 'Role not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: role
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.deleteRole = async (req, res) => {
  try {
    const role = await Role.findByIdAndDelete(req.params.id);
    if (!role) return res.status(404).json({ message: "Role not found" });
    res.json({ message: "Role deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.addRole = async (req, res) => {
  try {
    const newRole = await Role.create(req.body);
    res.status(201).json({
      success: true,
      data: newRole
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
