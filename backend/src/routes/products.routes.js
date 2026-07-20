'use strict';

const { Router } = require('express');
const asyncHandler = require('../utils/asyncHandler');
const {
  listProducts,
  listCategories,
  getProductById,
} = require('../controllers/products.controller');

const router = Router();

router.get('/', asyncHandler(listProducts));
router.get('/categories', asyncHandler(listCategories));
router.get('/:id', asyncHandler(getProductById));

module.exports = router;
