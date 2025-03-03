const express = require('express');
const router=express.Router();
const {getUsers,getUserById,getUserByUid,updateUserDetails,updateUser,deleteUser}=require('../controllers/user.controller.js')
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/images")); 
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); 
  },
});   
const upload = multer({ storage });  
router.get('/get',getUsers);
router.get('/get/:id', (req, res, next) => {
    console.log(`GET request received with ID: ${req.params.id}`);
    next();
}, getUserById);
router.get('/getUserByUid',getUserByUid);
router.put('/update',updateUser);
router.put('/update/:id',upload.fields([{ name: 'profilePicture', maxCount: 1 },{ name: 'residenceId', maxCount: 1 },{ name: 'documents', maxCount: 1 },{ name: 'officeId', maxCount: 1 },{ name: 'driverLicense', maxCount: 1 },{ name: 'passport', maxCount: 1},{ name: 'studentRenewalId', maxCount: 1 }]),(req, res, next) => {
    console.log(`GET request received with ID: ${req.params.id}`);
    next();  
},updateUserDetails);
router.delete('/delete:id',deleteUser);
module.exports=router;