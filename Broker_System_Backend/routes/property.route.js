const express = require("express");
const {createProperty,getAllProperties,getPropertyById,updateProperty,deleteProperty} = require("../controllers/property.controller"); 
const multer = require("multer");
const path = require("path");
const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/images")); 
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); 
  },
});   
const upload = multer({ storage });   
router.post("/create",upload.fields([{ name: 'houseImage', maxCount: 10 },{ name: 'ownershipMap', maxCount: 3 },{ name: 'inheritanceProof', maxCount: 3 },{ name: 'undocumentedOwnershipProof', maxCount: 3 },{ name: 'residentialHouseId', maxCount: 3 },{ name: 'ownershipProof', maxCount: 3 },{ name: 'judicialSaleDeed', maxCount: 3 }]), createProperty);

router.get("/get", getAllProperties); 
router.get('/get/:id', (req, res, next) => {
    console.log(`GET request received with ID: ${req.params.id}`);
    next();  
}, getPropertyById);
router.put("/update/:id",(req, res, next) => {
  console.log(`put request received with ID: ${req.params.id}`);
  next();  
}, updateProperty); 
router.delete("/delete/:id", deleteProperty); 


module.exports = router;