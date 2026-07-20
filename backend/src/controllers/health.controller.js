'use strict';

const config = require('../config');

const startedAt = Date.now();

/**
 * GET /api/health
 * Lightweight liveness/readiness probe used by uptime monitors, load
 * balancers, and CI smoke tests.
 */
function getHealth(req, res) {
  res.status(200).json({
    success: true,
    data: {
      status: 'ok',
      brand: config.brand.name,
      tagline: config.brand.tagline,
      environment: config.env,
      uptimeSeconds: Math.floor((Date.now() - startedAt) / 1000),
      timestamp: new Date().toISOString(),
    },
  });
}

module.exports = { getHealth };
