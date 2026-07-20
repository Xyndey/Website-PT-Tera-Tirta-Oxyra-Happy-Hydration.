'use strict';

const ApiError = require('../utils/ApiError');

/**
 * Catches any request that fell through every registered route and
 * converts it into a consistent 404 ApiError for the error handler.
 */
function notFound(req, res, next) {
  next(ApiError.notFound(`Route ${req.method} ${req.originalUrl} tidak ditemukan`));
}

module.exports = notFound;
