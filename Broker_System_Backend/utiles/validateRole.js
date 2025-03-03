const Role = require('../models/role.model');

const validateRole = async (req, res, next) => {
  const { roleId } = req.body;

  try {
    const role = await Role.findById(roleId);
    if (!role) {
      return res.status(400).json({ message: 'Invalid roleId provided' });
    }
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = validateRole;
