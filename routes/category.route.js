const express = require('express');

//including controller
const categoryController = require('../controllers/category.controller');

//creating a router instance
const router = express.Router();

//routing to get all business categories
router.get('/', categoryController.getCategories);
router.post('/', categoryController.createCategory);
router.get('/:id', categoryController.getCategoryById);
router.put('/:id', categoryController.updateCategory);

module.exports = router;