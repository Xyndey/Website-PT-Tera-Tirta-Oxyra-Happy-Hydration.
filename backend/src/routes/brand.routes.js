'use strict';

const { Router } = require('express');
const asyncHandler = require('../utils/asyncHandler');
const { getBrand } = require('../controllers/brand.controller');

const router = Router();

router.get('/', asyncHandler(getBrand));

module.exports = router;
