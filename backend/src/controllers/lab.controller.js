'use strict';

const db = require('../data');

/**
 * GET /api/lab-report
 * Returns the (currently illustrative) laboratory test receipt shown in
 * the "Bukti, bukan janji" section. Replace the underlying JSON fixture
 * with real, accredited lab results once available.
 */
function getLabReport(req, res) {
  res.status(200).json({ success: true, data: db.labReport });
}

module.exports = { getLabReport };
