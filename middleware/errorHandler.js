/**
 * Centralized error handling middleware.
 * Catches all errors passed via next(error) and returns a consistent response.
 * Must be registered LAST in server.js after all routes.
 */
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Mongoose: duplicate key error (e.g. duplicate email)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists.`;
    statusCode = 409;
  }

  // Mongoose: validation error (schema-level)
  if (err.name === 'ValidationError') {
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(', ');
    statusCode = 400;
  }

  // Mongoose: invalid ObjectId format
  if (err.name === 'CastError') {
    message = `Invalid ID format: ${err.value}`;
    statusCode = 400;
  }

  // Log full error in development for easier debugging
  if (process.env.NODE_ENV === 'development') {
    console.error(err);
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = errorHandler;
