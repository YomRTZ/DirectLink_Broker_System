const express = require("express");
const router = express.Router();
const { filterPreferences } = require("../controllers/filter.controller");
// router.get("/filter/properties", filterPreferences);
router.get("/properties", (req, res, next) => {
    console.log(`GET request received with ID: ${req.params.id}`);
    next();
}, filterPreferences);
module.exports = router;

 