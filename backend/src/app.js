'use strict';

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');

const config = require('./config');
const routes = require('./routes');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');
const { apiLimiter } = require('./middleware/rateLimiter');

const app = express();

// ── Security & performance ──────────────────────────────────────────────
app.use(helmet());
app.use(compression());

// ── CORS ─────────────────────────────────────────────────────────────────
app.use(
  cors({
    origin(origin, callback) {
      // Allow non-browser tools (curl, Postman, server-to-server) with no origin.
      if (!origin || config.cors.origins.includes(origin) || config.cors.origins.includes('*')) {
        return callback(null, true);
      }
      return callback(new Error(`CORS: origin ${origin} tidak diizinkan`));
    },
    credentials: true,
  })
);

// ── Body parsing ─────────────────────────────────────────────────────────
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

// ── Logging ──────────────────────────────────────────────────────────────
app.use(morgan(config.isProduction ? 'combined' : 'dev'));

// ── Rate limiting (global) ───────────────────────────────────────────────
app.use('/api', apiLimiter);

// ── Root welcome route ───────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: `Selamat datang di ${config.brand.name} API — ${config.brand.tagline}.`,
    docs: '/api/health',
  });
});

// ── API routes ───────────────────────────────────────────────────────────
app.use('/api', routes);

// ── 404 + centralized error handling ─────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

module.exports = app;
