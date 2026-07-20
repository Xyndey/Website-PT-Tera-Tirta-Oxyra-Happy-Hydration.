'use strict';

const { Router } = require('express');
const asyncHandler = require('../utils/asyncHandler');
const { listReasons } = require('../controllers/why.controller');

const router = Router();

router.get('/', asyncHandler(listReasons));

module.exports = router;
