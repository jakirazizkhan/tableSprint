const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// Get all categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new category
router.post('/categories', async (req, res) => {
  const { name, sequence, status, image } = req.body;
  const newCategory = new Category({ name, sequence, status, image });

  try {
    const savedCategory = await newCategory.save();
    res.json(savedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update an existing category
router.put('/categories/:id', async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a category
router.delete('/categories/:id', async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    res.json(deletedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
