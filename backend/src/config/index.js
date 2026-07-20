'use strict';

require('dotenv').config();

/**
 * Parses a comma separated environment variable into a trimmed array.
 * @param {string|undefined} value
 * @returns {string[]}
 */
function parseList(value) {
  if (!value) return [];
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

const config = {
  env: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 4000,
  isProduction: process.env.NODE_ENV === 'production',

  cors: {
    origins: parseList(process.env.CORS_ORIGIN) || ['http://localhost:5173'],
  },

  brand: {
    name: process.env.BRAND_NAME || 'OXYRA',
    tagline: process.env.BRAND_TAGLINE || 'Happy Hydration Era',
    whatsappNumber: process.env.WHATSAPP_NUMBER || '628117710369',
    instagramHandle: process.env.INSTAGRAM_HANDLE || 'oxyrawater.id',
    serviceArea: process.env.SERVICE_AREA || 'Batam, Indonesia',
  },

  rateLimit: {
    windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
    max: Number(process.env.RATE_LIMIT_MAX) || 200,
  },
};

module.exports = config;
