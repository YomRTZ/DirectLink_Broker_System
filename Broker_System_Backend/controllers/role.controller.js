
const Role = require("../models/role.model");
const createRole = async (req, res) => {
  const { name} = req.body;
  try {
    const existingRole = await Role.findOne({ name });
    if (existingRole) {
      return res.status(400).json({ error: "Role already exists" });
    }
    const newRole = new Role({
      name,
    });
    await newRole.save();
    res.status(201).json({ message: "Role created successfully", role: newRole });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json({ roles });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRoleName=async(req,res)=>{
    try {
        const {id} = req.params;
    
        if (!id) {
          return res.status(400).json({ error: 'Role ID is required' });
        }
    
        const role = await Role.findById(id);
        if (!role) {
          return res.status(404).json({ error: 'Role not found' });
        }
    
        res.status(200).json({ roleName: role.name });
      } catch (error) {
        console.error('Error fetching role name:', error.message);
        res.status(500).json({ error: 'Internal server error' });
      }
}
module.exports = { createRole, getAllRoles,getRoleName };
