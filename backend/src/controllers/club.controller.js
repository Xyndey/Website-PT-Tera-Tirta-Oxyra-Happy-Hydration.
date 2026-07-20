'use strict';

const db = require('../data');

/**
 * GET /api/club
 * Returns the Happy Hydration Club content: hero image, activities and
 * membership benefits.
 */
function getClub(req, res) {
  res.status(200).json({ success: true, data: db.club });
}

module.exports = { getClub };
