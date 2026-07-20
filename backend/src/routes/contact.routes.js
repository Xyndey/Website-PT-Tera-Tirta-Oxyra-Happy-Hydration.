'use strict';

const { Router } = require('express');
const asyncHandler = require('../utils/asyncHandler');
const { writeLimiter } = require('../middleware/rateLimiter');
const { submitContact, listContacts } = require('../controllers/contact.controller');

const router = Router();

router.post('/', writeLimiter, asyncHandler(submitContact));
router.get('/', asyncHandler(listContacts));

module.exports = router;
