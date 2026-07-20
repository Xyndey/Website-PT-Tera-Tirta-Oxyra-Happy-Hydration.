'use strict';

const app = require('./app');
const config = require('./config');
const logger = require('./utils/logger');

const server = app.listen(config.port, () => {
  logger.info(
    `${config.brand.name} API berjalan di http://localhost:${config.port} (${config.env})`
  );
});

/**
 * Gracefully shuts down the HTTP server on termination signals, giving
 * in-flight requests a chance to finish before the process exits.
 *
 * @param {string} signal
 */
function shutdown(signal) {
  logger.warn(`Menerima ${signal}. Menutup server dengan baik...`);
  server.close(() => {
    logger.info('Server ditutup. Sampai jumpa!');
    process.exit(0);
  });

  // Force-exit if close takes too long.
  setTimeout(() => {
    logger.error('Penutupan paksa server setelah timeout.');
    process.exit(1);
  }, 10000).unref();
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled Promise Rejection:', reason);
});

process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception:', err);
  process.exit(1);
});

module.exports = server;
