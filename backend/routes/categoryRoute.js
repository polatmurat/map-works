const express = require('express');
const router = express.Router();
const { createCategory, fetchCategory, updateCategory, categories, deleteCategory, getAllCategories } = require('../controllers/categoryController');
const Authorization = require('../services/Authorization');

router.post("/create-category", Authorization.authorized, createCategory);
router.get('/categories/:page', Authorization.authorized, categories);
router.delete('/delete-category/:id', Authorization.authorized, deleteCategory);
router.get('/fetch-category/:id', Authorization.authorized, fetchCategory);
router.put('/update-category/:id', Authorization.authorized, updateCategory);
router.get('/all-categories', getAllCategories)
// router.get('/random-categories', randomCategories)
module.exports = router;