'use strict';

const db = require('../data');

/**
 * GET /api/why
 * Returns the "Kenapa Oxyra" value-proposition cards.
 */
function listReasons(req, res) {
  res.status(200).json({
    success: true,
    count: db.whyOxyra.length,
    data: db.whyOxyra,
  });
}

module.exports = { listReasons };
