'use strict';

const products = require('./products.json');
const testimonials = require('./testimonials.json');
const whyOxyra = require('./why-oxyra.json');
const club = require('./club.json');
const labReport = require('./lab-report.json');

/**
 * In-memory "database" seeded from static JSON fixtures. This keeps the
 * OXYRA backend dependency-free for a data store while still exposing a
 * realistic repository-style API that could later be swapped for a real
 * database (Postgres, MongoDB, etc.) without touching the controllers.
 */
module.exports = {
  products,
  testimonials,
  whyOxyra,
  club,
  labReport,
};
