'use strict';

const db = require('../data');

/**
 * GET /api/testimonials
 * Returns customer testimonials shown in the "Kata Mereka" section.
 */
function listTestimonials(req, res) {
  res.status(200).json({
    success: true,
    count: db.testimonials.length,
    data: db.testimonials,
  });
}

module.exports = { listTestimonials };
