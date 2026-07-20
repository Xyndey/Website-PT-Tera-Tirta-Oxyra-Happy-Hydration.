'use strict';

const { Router } = require('express');
const asyncHandler = require('../utils/asyncHandler');
const { getLabReport } = require('../controllers/lab.controller');

const router = Router();

router.get('/', asyncHandler(getLabReport));

module.exports = router;
