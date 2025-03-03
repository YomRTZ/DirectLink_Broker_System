const express = require('express');
const router = express.Router();
const {createCategory,getAllCategories,getCategoryById,updateCategory,deleteCategory} = require('../controllers/category.controller');

router.post('/create',createCategory);
router.get('/get',getAllCategories);
router.get('/get/:id',getCategoryById);
router.put('/update/:id',updateCategory);
router.delete('/delete:id',deleteCategory);

module.exports = router;
