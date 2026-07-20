'use strict';

const { Router } = require('express');
const asyncHandler = require('../utils/asyncHandler');
const { listTestimonials } = require('../controllers/testimonials.controller');

const router = Router();

router.get('/', asyncHandler(listTestimonials));

module.exports = router;
