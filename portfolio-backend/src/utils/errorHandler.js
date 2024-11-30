import logger from './logger.js';

// Handle Uncaught Exceptions
(function handleUncaughtExceptions() {
  process.on('uncaughtException', (err) => {
    logger.error({
      message: 'Uncaught Exception',
      stack: err.stack,

    });
    console.error('Uncaught Exception:', err);
    // Exit the process gracefully after logging
    setTimeout(() => process.exit(1), 1000);
  });
})();

// Handle Unhandled Promise Rejections
(function handleUnhandledRejections() {
  process.on('unhandledRejection', (reason, promise) => {
    logger.error({
      message: 'Unhandled Promise Rejection',
      reason,
    });
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  });
})();
