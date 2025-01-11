const { Router } = require('express');
const { check } = require('express-validator');

const {
  deleteProducts,
  getProducts,
  productsPost,
  productsPut,
} = require('../controllers/product');

const router = Router();

router.get('/', [], getProducts);

router.post(
  '/',
  [
    check('name', 'The name is required').not().isEmpty(),
    check('description', 'The description is required').not().isEmpty(),
    check('category', 'The category is required').not().isEmpty(),
    check('thumbnail', 'The thumbnail is required').not().isEmpty(),
  ],
  productsPost,
);

router.put('/:id', [check('id', 'Is not a valid id').isMongoId()], productsPut);

router.delete('/:id', [check('id', 'Is not a valid id').isMongoId()], deleteProducts);

module.exports = router;
