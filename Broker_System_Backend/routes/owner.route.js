const express = require('express');
const router=express.Router();
const {getOwners,getOwnerById,updateOwnerDetails}=require('../controllers/OwnerController')
router.get('/get',getOwners);
router.get('/get/:id', (req, res, next) => {
    console.log(`GET request received with ID: ${req.params.id}`);
    next();  // Proceed to the controller function
}, getOwnerById);
router.put('/update',updateOwnerDetails);
// router.put('/update:id',updateUser);
// router.delete('/delete:id',deleteUser);
module.exports=router;