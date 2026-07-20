'use strict';

const { Router } = require('express');
const asyncHandler = require('../utils/asyncHandler');
const { writeLimiter } = require('../middleware/rateLimiter');
const { createOrder, listOrders, getOrderById } = require('../controllers/orders.controller');

const router = Router();

router.post('/', writeLimiter, asyncHandler(createOrder));
router.get('/', asyncHandler(listOrders));
router.get('/:id', asyncHandler(getOrderById));

module.exports = router;
