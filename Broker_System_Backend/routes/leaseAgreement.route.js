const express = require("express");
const { leaseAgreement,getLeaseAgreement,updateLeaseAgreements, getAllLeases, updateLeaseStatus} = require("../controllers/leaseAgreement.controller");
const router = express.Router();
router.post("/create", leaseAgreement);
router.get("/get",getAllLeases); 
router.get('/get/:id', (req, res, next) => {
    console.log(`GET request received with ID: ${req.params.id}`);
    next();  
},getLeaseAgreement);
router.put('/update/:id',(req, res, next) => {
    console.log(`GET request received with ID: ${req.params.id}`);
    next();  
},updateLeaseAgreements);

router.put('/update/:id/status', (req, res, next) => {
    console.log(`PUT request received for lease ID: ${req.params.id}`);
    next();
}, updateLeaseStatus);
module.exports = router;