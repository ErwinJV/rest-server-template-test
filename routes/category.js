const { Router } = require('express');

const { deleteCategory, getCategories, postCategory } = require('../controllers/category');

const router = Router();

router.get('/', [], getCategories);

router.post('/', [], postCategory);

router.delete('/:id', [], deleteCategory);

module.exports = router;
