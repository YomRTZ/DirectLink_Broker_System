const Category = require('../models/category.model');
exports.createCategory = async (req, res) => {
  try {
    const { type, residentialTypeUnit, amenities } = req.body;

    console.log('Incoming request data:', req.body); 
    const category = new Category({
      type,
      residentialTypeUnit,
      amenities,
    });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    console.error("Error creating category:", error); 
    res.status(500).json({ error: error.message });
  }
};
// Get all Categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Category
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, residentialTypeUnit, amenities } = req.body;

    const category = await Category.findByIdAndUpdate(
      id,
      { type, residentialTypeUnit, amenities },
      { new: true } 
    );

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Category
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
