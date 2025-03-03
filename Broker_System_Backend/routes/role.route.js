
const express = require("express");
const { createRole, getAllRoles,getRoleName } = require("../controllers/role.controller");
const router = express.Router();
router.post("/create", createRole);
router.get("/all", getAllRoles);
router.get('/:id', getRoleName);
module.exports = router;
