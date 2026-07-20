'use strict';

const { Router } = require('express');
const asyncHandler = require('../utils/asyncHandler');
const { getClub } = require('../controllers/club.controller');

const router = Router();

router.get('/', asyncHandler(getClub));

module.exports = router;
