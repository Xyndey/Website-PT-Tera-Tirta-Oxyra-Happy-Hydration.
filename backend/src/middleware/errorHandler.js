'use strict';

const config = require('../config');
const logger = require('../utils/logger');

/**
 * Express error-handling middleware. Must be registered last, after all
 * routes and the `notFound` middleware. Normalizes both operational
 * `ApiError`s and unexpected exceptions into one JSON response shape.
 *
 * @param {Error & { statusCode?: number, isOperational?: boolean, details?: any }} err
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} _next
 */
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, _next) {
  const statusCode = err.statusCode && err.statusCode >= 400 ? err.statusCode : 500;
  const isOperational = Boolean(err.isOperational);

  if (!isOperational) {
    logger.error('Unhandled error:', err);
  } else if (statusCode >= 500) {
    logger.error(err.message, err.details || '');
  } else {
    logger.warn(err.message, err.details || '');
  }

  const body = {
    success: false,
    error: {
      message: isOperational ? err.message : 'Terjadi kesalahan pada server. Silakan coba lagi nanti.',
      code: statusCode,
    },
  };

  if (err.details) body.error.details = err.details;
  if (!config.isProduction && !isOperational) body.error.stack = err.stack;

  res.status(statusCode).json(body);
}

module.exports = errorHandler;
