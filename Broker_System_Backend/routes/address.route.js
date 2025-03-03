const express = require('express');
const router = express.Router();
const {createAddress,getAllAddresses,getAddressById,updateAddress,deleteAddress} = require('../controllers/address.controller');

// Routes for Address
router.post('/create',createAddress);
router.get('/get',getAllAddresses);
router.get('/get/:id', (req, res, next) => {
    console.log(`GET request received with ID: ${req.params.id}`);
    next();  
},getAddressById);

router.put('/update/:id',(req, res, next) => {
    console.log(`update request received with ID: ${req.params.id}`);
    next();  
},updateAddress);


router.delete('/delete:id',deleteAddress);

module.exports = router;
