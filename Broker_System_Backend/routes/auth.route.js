const express = require("express");
const { signup,login,authMiddleware,logout } = require("../controllers/auth.controller");
const router = express.Router();

router.post("/signup", signup);

// Public Route
router.post('/login', login);
// Logout route
router.post('/logout', logout);
router.post('/authMiddleware', authMiddleware, (req, res) => {
  res.status(200).json({ authenticated: true });
});
module.exports = router;