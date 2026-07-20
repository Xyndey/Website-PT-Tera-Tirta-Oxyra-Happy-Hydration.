'use strict';

const rateLimit = require('express-rate-limit');
const config = require('../config');
const ApiError = require('../utils/ApiError');

/**
 * General-purpose API rate limiter. Applied globally in app.js, with a
 * stricter variant available for write-heavy endpoints like /orders.
 */
const apiLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next) => {
    next(ApiError.tooManyRequests());
  },
});

/**
 * A stricter limiter for endpoints that write data (orders, contact
 * messages), to reduce spam / abuse while still allowing normal usage.
 */
const writeLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: Math.max(20, Math.round(config.rateLimit.max / 4)),
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next) => {
    next(ApiError.tooManyRequests('Terlalu banyak permintaan. Silakan coba lagi beberapa saat lagi.'));
  },
});

module.exports = { apiLimiter, writeLimiter };
