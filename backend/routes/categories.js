const express = require('express');
const router = express.Router();
const CategoriesController = require('../controllers/categoriesController');

router.post('/', CategoriesController.createCategory);
router.get('/', CategoriesController.getCategories);
router.get('/:id', CategoriesController.getCategoryById);
router.put('/:id', CategoriesController.updateCategory);
router.delete('/:id', CategoriesController.deleteCategory);

module.exports = router;
